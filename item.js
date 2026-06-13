(function() {
   
    const blockList = [
        "fuck", "shit", "bitch", "asshole", "dick", "pussy", "cunt", "slut", 
        "whore", "fag", "faggot", "nigger", "nigga", "porn", "sex", "cock", 
        "boobs", "vagina", "penis", "bastard", "crap", "damn", "kill", "suicide", 
        "rape", "dumbass", "motherfucker", "wtf", "stfu", "lmao", "lmfao"
    ];

    function cleanContent(text) {
        let safeText = text;
        blockList.forEach(word => {
            const regex = new RegExp("\\b" + word + "\\b", "gi");
            safeText = safeText.replace(regex, "🍓🍓");
        });
        return safeText;
    }

    const urlRegex = /(https?:\/\/[^\s]+)|(www\.[^\s]+)|([a-zA-Z0-9-]+\.(com|org|net|site|io|me|info|co|us|uk|gg)\b)/gi;

    let myNick = localStorage.getItem('edu_stream_nick');
    if (!myNick) {
        myNick = "Student " + Math.floor(Math.random() * 9000 + 1000);
        localStorage.setItem('edu_stream_nick', myNick);
    }

  
    const styles = `
        #edu-stream-wrap {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 999999;
            width: 100%;
            max-width: 300px;
            height: 380px;
            background: linear-gradient(180deg, #0a0b14 0%, #1a1a24 100%);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 8px;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            display: none; /* İLK BAŞTA GİZLİ */
            flex-direction: column;
            overflow: hidden;
            box-shadow: 0 8px 25px rgba(0,0,0,0.7);
            transform-origin: bottom right;
            animation: popIn 0.3s ease;
        }
        
        #edu-stream-open-btn {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 999998;
            background: linear-gradient(135deg, #00d2ff, #0055ff);
            color: #fff;
            padding: 12px 20px;
            border-radius: 50px;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-weight: 800;
            font-size: 14px;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(0,0,0,0.5);
            transition: all 0.3s ease;
            display: flex; /* İLK BAŞTA GÖRÜNÜR */
            align-items: center;
            gap: 8px;
        }
        #edu-stream-open-btn:hover {
            transform: scale(1.05) translateY(-3px);
            box-shadow: 0 8px 20px rgba(0, 210, 255, 0.4);
        }

        .stream-head {
            background: rgba(0, 0, 0, 0.8);
            padding: 10px 12px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-weight: 800;
            font-size: 14px;
            color: #fff;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            letter-spacing: 0.5px;
        }
        .stream-close-btn {
            background: none;
            border: none;
            color: #ff4444;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            padding: 0 5px;
            transition: transform 0.2s;
        }
        .stream-close-btn:hover {
            transform: scale(1.2);
            color: #ff0000;
        }
        .stream-body {
            flex: 1;
            overflow-y: auto;
            padding: 10px;
            display: flex;
            flex-direction: column;
            gap: 12px;
            scrollbar-width: none;
            user-select: none;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
        }
        .stream-body::-webkit-scrollbar { display: none; }
        
        .msg-wrapper {
            display: flex;
            flex-direction: column;
            animation: popIn 0.3s ease;
            max-width: 85%;
        }
        .msg-wrapper.mine { align-self: flex-end; }
        .msg-wrapper.others { align-self: flex-start; }

        .msg-nick {
            font-size: 10px;
            color: #888;
            margin-bottom: 3px;
            margin-left: 4px;
            font-weight: 600;
        }

        .note-bubble {
            padding: 8px 12px;
            border-radius: 12px;
            word-break: break-word;
            font-size: 13px;
            color: #fff;
        }
        .msg-wrapper.others .note-bubble {
            background: rgba(255, 255, 255, 0.1);
            border-bottom-left-radius: 2px;
        }
        .msg-wrapper.mine .note-bubble {
            background: #00d2ff;
            color: #000;
            font-weight: 600;
            border-bottom-right-radius: 2px;
        }
        @keyframes popIn { 0% { transform: scale(0.8); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
        
        .stream-foot {
            display: flex;
            padding: 10px;
            background: rgba(0, 0, 0, 0.6);
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
        <div id="edu-stream-open-btn" title="Open Class Notes">
            <span>📚</span> Notes
        </div>

        <div id="edu-stream-wrap">
            <div class="stream-head">
                <span>📚 Live Class Notes</span>
                <button id="stream-close" class="stream-close-btn" title="Close">✖</button>
            </div>
            <div id="stream-content" class="stream-body"></div>
            <div class="stream-foot">
                <input type="text" id="stream-input" placeholder="Share a note..." maxlength="60" autocomplete="off" spellcheck="false">
                <button id="stream-btn">POST</button>
            </div>
        </div>
    `;

 
    let isFirebaseLoaded = false;
    let isFirebaseInit = false;
    let mySessionId = Math.random().toString(36).substr(2, 9);
    let notesRef;

   
    function initFirebaseLogic() {
        if (!isFirebaseInit) {
            const firebaseConfig = {
                apiKey: "AIzaSyDlCbxHH6FlZuqmQazSFKDdQAHXyoDdTFw",
                authDomain: "edu-sync-core.firebaseapp.com",
                databaseURL: "https://edu-sync-core-default-rtdb.firebaseio.com",
                projectId: "edu-sync-core",
                storageBucket: "edu-sync-core.firebasestorage.app",
                messagingSenderId: "517224017676",
                appId: "1:517224017676:web:6794a8f2d8a9ba4de52329"
            };
            firebase.initializeApp(firebaseConfig);
            notesRef = firebase.database().ref('shared-notes');
            isFirebaseInit = true;

           
            const feedArea = document.getElementById('stream-content');
            const twelveHoursInMs = 12 * 60 * 60 * 1000;
            
            notesRef.orderByChild('timestamp').limitToLast(30).on('child_added', (snapshot) => {
                const data = snapshot.val();
                if (!data) return;
                if (Date.now() - data.timestamp > twelveHoursInMs) return;

                const isMe = data.sender === mySessionId;
                const wrapper = document.createElement('div');
                wrapper.className = `msg-wrapper ${isMe ? 'mine' : 'others'}`;

                if (!isMe && data.nick) {
                    const nickSpan = document.createElement('div');
                    nickSpan.className = 'msg-nick';
                    nickSpan.innerText = data.nick;
                    wrapper.appendChild(nickSpan);
                }

                const bubble = document.createElement('div');
                bubble.className = 'note-bubble';
                bubble.innerText = data.text;
                
                wrapper.appendChild(bubble);
                feedArea.appendChild(wrapper);
                
                setTimeout(() => { feedArea.scrollTop = feedArea.scrollHeight; }, 50);
            });
        }
        
      
        firebase.database().goOnline();
        
        // 12 Saatlik Temizlik (Sadece açıldığında bir kere kontrol eder)
        const cutoffTime = Date.now() - (12 * 60 * 60 * 1000);
        notesRef.orderByChild('timestamp').endAt(cutoffTime).once('value', (snapshot) => {
            snapshot.forEach((child) => { child.ref.remove(); });
        });
    }

   
    function setupUI() {
        let targetDiv = document.getElementById("edu-live-stream-container");
        if (!targetDiv) {
            targetDiv = document.createElement("div");
            targetDiv.id = "edu-live-stream-container";
            document.body.appendChild(targetDiv);
        }

        const styleTag = document.createElement("style");
        styleTag.innerHTML = styles;
        document.head.appendChild(styleTag);
        targetDiv.innerHTML = htmlContent;

        const wrapBox = document.getElementById('edu-stream-wrap');
        const closeBtn = document.getElementById('stream-close');
        const openBtn = document.getElementById('edu-stream-open-btn');
        const feedArea = document.getElementById('stream-content');
        const inputField = document.getElementById('stream-input');
        const postBtn = document.getElementById('stream-btn');
        let isWaiting = false;

      
        inputField.addEventListener('paste', (e) => { e.preventDefault(); });
        feedArea.addEventListener('contextmenu', (e) => { e.preventDefault(); });
        feedArea.addEventListener('copy', (e) => { e.preventDefault(); });

      
        openBtn.addEventListener('click', () => {
            openBtn.style.display = 'none';
            wrapBox.style.display = 'flex';
            inputField.focus();

            if (!isFirebaseLoaded) {
               
                const scriptApp = document.createElement('script');
                scriptApp.src = "https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js";
                document.head.appendChild(scriptApp);

                scriptApp.onload = () => {
                    const scriptDb = document.createElement('script');
                    scriptDb.src = "https://www.gstatic.com/firebasejs/10.12.2/firebase-database-compat.js";
                    document.head.appendChild(scriptDb);
                    
                    scriptDb.onload = () => {
                        isFirebaseLoaded = true;
                        initFirebaseLogic();
                    };
                };
            } else {
               
                firebase.database().goOnline();
            }
        });

       
        closeBtn.addEventListener('click', () => {
            wrapBox.style.display = 'none';
            openBtn.style.display = 'flex';
            
            // KOTA TASARRUFU: BAĞLANTIYI ANINDA KES!
            if (isFirebaseLoaded && isFirebaseInit) {
                firebase.database().goOffline();
            }
        });

      
        function publishNote() {
            if (!isFirebaseInit) return;
            const rawVal = inputField.value.trim();
            if (rawVal === "" || isWaiting) return;

            if (urlRegex.test(rawVal)) {
                alert("Links are not allowed! 🚫");
                inputField.value = "";
                return;
            }

            const cleanVal = cleanContent(rawVal);
            isWaiting = true;
            postBtn.disabled = true;
            inputField.value = "";

            notesRef.push({
                text: cleanVal,
                sender: mySessionId,
                nick: myNick,
                timestamp: firebase.database.ServerValue.TIMESTAMP
            }).then(() => {
                setTimeout(() => {
                    isWaiting = false;
                    postBtn.disabled = false;
                    inputField.focus();
                }, 3000);
            });
        }

        postBtn.addEventListener('click', publishNote);
        inputField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') publishNote();
        });
    }

  
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupUI);
    } else {
        setupUI();
    }
})();
