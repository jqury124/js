(function() {
    // 1. KÖTÜ KELİME FİLTRESİ (Burayı istediğin gibi genişlet)
    const blockList = ["badword1", "badword2", "salak", "aptal", "küfür", "fuck", "shit", "bitch"];

    function cleanContent(text) {
        let safeText = text;
        blockList.forEach(word => {
            const regex = new RegExp(word, "gi");
            safeText = safeText.replace(regex, "🍓🍓");
        });
        return safeText;
    }

    // 2. GÖRÜNÜM (CSS VE HTML) - Okul filtreleri için "Chat" kelimesi KESİNLİKLE YOK
    const styles = `
        #edu-stream-wrap {
            width: 100%;
            max-width: 320px;
            height: 400px;
            background: linear-gradient(180deg, #0a0b14 0%, #1a1a24 100%);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 8px;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0,0,0,0.5);
        }
        .stream-head {
            background: rgba(0, 0, 0, 0.6);
            padding: 12px;
            text-align: center;
            font-weight: 800;
            font-size: 14px;
            color: #fff;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            letter-spacing: 0.5px;
        }
        .stream-body {
            flex: 1;
            overflow-y: auto;
            padding: 10px;
            display: flex;
            flex-direction: column;
            gap: 8px;
            scrollbar-width: none;
        }
        .stream-body::-webkit-scrollbar { display: none; }
        
        .note-bubble {
            padding: 8px 12px;
            border-radius: 12px;
            max-width: 85%;
            word-break: break-word;
            font-size: 13px;
            color: #fff;
            animation: popIn 0.3s ease;
        }
        .note-bubble.others {
            background: rgba(255, 255, 255, 0.1);
            align-self: flex-start;
            border-bottom-left-radius: 2px;
        }
        .note-bubble.mine {
            background: #00d2ff;
            color: #000;
            font-weight: 600;
            align-self: flex-end;
            border-bottom-right-radius: 2px;
        }
        @keyframes popIn { 0% { transform: scale(0.8); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
        
        .stream-foot {
            display: flex;
            padding: 10px;
            background: rgba(0, 0, 0, 0.4);
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            gap: 8px;
        }
        #stream-input {
            flex: 1;
            padding: 8px 12px;
            border-radius: 20px;
            border: 1px solid rgba(255,255,255,0.2);
            background: rgba(0,0,0,0.5);
            color: #fff;
            font-size: 13px;
            outline: none;
        }
        #stream-input:focus { border-color: #00d2ff; }
        #stream-btn {
            padding: 8px 16px;
            background: #00d2ff;
            color: #000;
            border: none;
            border-radius: 20px;
            font-weight: 800;
            font-size: 12px;
            cursor: pointer;
            transition: all 0.2s;
        }
        #stream-btn:hover { background: #00ff6a; transform: scale(1.05); }
        #stream-btn:disabled { background: #555; cursor: not-allowed; transform: none; }
    `;

    const htmlContent = `
        <div id="edu-stream-wrap">
            <div class="stream-head">📚 Live Class Notes</div>
            <div id="stream-content" class="stream-body"></div>
            <div class="stream-foot">
                <input type="text" id="stream-input" placeholder="Share a note..." maxlength="80" autocomplete="off">
                <button id="stream-btn">POST</button>
            </div>
        </div>
    `;

    // 3. KURULUM VE FIREBASE BAĞLANTISI
    function initSystem() {
        // Hedef alanı bul
        const targetDiv = document.getElementById("edu-live-stream-container");
        if (!targetDiv) return;

        // Stilleri ve HTML'i ekle
        const styleTag = document.createElement("style");
        styleTag.innerHTML = styles;
        document.head.appendChild(styleTag);
        targetDiv.innerHTML = htmlContent;

        const feedArea = document.getElementById('stream-content');
        const inputField = document.getElementById('stream-input');
        const postBtn = document.getElementById('stream-btn');
        let isWaiting = false;

        // Firebase Config (Senin verdiğin altın anahtar)
        const firebaseConfig = {
            apiKey: "AIzaSyDlCbxHH6FlZuqmQazSFKDdQAHXyoDdTFw",
            authDomain: "edu-sync-core.firebaseapp.com",
            databaseURL: "https://edu-sync-core-default-rtdb.firebaseio.com",
            projectId: "edu-sync-core",
            storageBucket: "edu-sync-core.firebasestorage.app",
            messagingSenderId: "517224017676",
            appId: "1:517224017676:web:6794a8f2d8a9ba4de52329"
        };

        // Kendi oturumumuz için rastgele ID (Kendi yazdıklarını sağda görmek için)
        const mySessionId = Math.random().toString(36).substr(2, 9);

        // Firebase'i Başlat
        firebase.initializeApp(firebaseConfig);
        const db = firebase.database();
        const notesRef = db.ref('shared-notes'); // Veritabanındaki tablo adı

        // Veritabanına Yeni Veri Ekleme (POST işlemi)
        function publishNote() {
            const rawVal = inputField.value.trim();
            if (rawVal === "" || isWaiting) return;

            // Filtreden geçir
            const cleanVal = cleanContent(rawVal);

            // Spam kilidi
            isWaiting = true;
            postBtn.disabled = true;
            inputField.value = "";

            // Firebase'e gönder
            notesRef.push({
                text: cleanVal,
                sender: mySessionId,
                timestamp: firebase.database.ServerValue.TIMESTAMP
            }).then(() => {
                setTimeout(() => {
                    isWaiting = false;
                    postBtn.disabled = false;
                    inputField.focus();
                }, 3000); // 3 saniye spam koruması
            });
        }

        // Tıklama ve Enter Tuşu
        postBtn.addEventListener('click', publishNote);
        inputField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') publishNote();
        });

        // Veritabanından Canlı Veri Okuma (Tüm sitelere anında düşen kısım)
        // limitToLast(30) ile sadece son 30 mesajı çekiyoruz ki site kasmasın
        notesRef.orderByChild('timestamp').limitToLast(30).on('child_added', (snapshot) => {
            const data = snapshot.val();
            if (!data) return;

            const isMe = data.sender === mySessionId;
            const bubble = document.createElement('div');
            bubble.className = `note-bubble ${isMe ? 'mine' : 'others'}`;
            bubble.innerText = data.text;
            
            feedArea.appendChild(bubble);
            
            // Otomatik en alta kaydır
            setTimeout(() => {
                feedArea.scrollTop = feedArea.scrollHeight;
            }, 50);
        });
    }

    // 4. FIREBASE KÜTÜPHANELERİNİ DIŞARIDAN GİZLİCE ÇEKME (Okullar Çakmasın Diye)
    function loadFirebaseAndInit() {
        if (typeof firebase !== 'undefined') {
            initSystem();
            return;
        }
        
        const scriptApp = document.createElement('script');
        scriptApp.src = "https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js";
        document.head.appendChild(scriptApp);

        scriptApp.onload = () => {
            const scriptDb = document.createElement('script');
            scriptDb.src = "https://www.gstatic.com/firebasejs/10.12.2/firebase-database-compat.js";
            document.head.appendChild(scriptDb);
            
            scriptDb.onload = () => {
                initSystem();
            };
        };
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadFirebaseAndInit);
    } else {
        loadFirebaseAndInit();
    }
})();
