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
            display: flex;
            flex-direction: column;
            overflow: hidden;
            box-shadow: 0 8px 25px rgba(0,0,0,0.7);
            transition: opacity 0.3s ease, transform 0.3s ease;
        }
        #edu-stream-wrap.closed {
            opacity: 0;
            transform: translateY(20px);
            pointer-events: none;
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
        <div id="edu-stream-wrap">
            <div class="stream-head">
                <span>📚 Live Class Notes</span>
                <button id="stream-close" class="stream-close-btn" title="Close">✖</button>
            </div>
            <div id="stream-content" class="stream-body"></div>
            <div class="stream-foot">
                <input type="text" id="stream-input" placeholder="Share a note..." maxlength="80" autocomplete="off">
                <button id="stream-btn">POST</button>
            </div>
        </div>
    `;

    
    function initSystem() {
       
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
        const feedArea = document.getElementById('stream-content');
        const inputField = document.getElementById('stream-input');
        const postBtn = document.getElementById('stream-btn');
        let isWaiting = false;

        
        closeBtn.addEventListener('click', () => {
            wrapBox.classList.add('closed');
            setTimeout(() => { wrapBox.style.display = 'none'; }, 300);
        });

        
        const firebaseConfig = {
            apiKey: "AIzaSyDlCbxHH6FlZuqmQazSFKDdQAHXyoDdTFw",
            authDomain: "edu-sync-core.firebaseapp.com",
            databaseURL: "https://edu-sync-core-default-rtdb.firebaseio.com",
            projectId: "edu-sync-core",
            storageBucket: "edu-sync-core.firebasestorage.app",
            messagingSenderId: "517224017676",
            appId: "1:517224017676:web:6794a8f2d8a9ba4de52329"
        };

        const mySessionId = Math.random().toString(36).substr(2, 9);
        firebase.initializeApp(firebaseConfig);
        const db = firebase.database();
        const notesRef = db.ref('shared-notes');

        
      
        const twelveHoursInMs = 12 * 60 * 60 * 1000;
        const cutoffTime = Date.now() - twelveHoursInMs;
        
        notesRef.orderByChild('timestamp').endAt(cutoffTime).once('value', (snapshot) => {
            snapshot.forEach((child) => {
                child.ref.remove();  
            });
        });
       

      
        function publishNote() {
            const rawVal = inputField.value.trim();
            if (rawVal === "" || isWaiting) return;

            const cleanVal = cleanContent(rawVal);
            isWaiting = true;
            postBtn.disabled = true;
            inputField.value = "";

            notesRef.push({
                text: cleanVal,
                sender: mySessionId,
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

       
        notesRef.orderByChild('timestamp').limitToLast(30).on('child_added', (snapshot) => {
            const data = snapshot.val();
            if (!data) return;

            
            if (Date.now() - data.timestamp > twelveHoursInMs) return;

            const isMe = data.sender === mySessionId;
            const bubble = document.createElement('div');
            bubble.className = `note-bubble ${isMe ? 'mine' : 'others'}`;
            bubble.innerText = data.text;
            
            feedArea.appendChild(bubble);
            
            setTimeout(() => {
                feedArea.scrollTop = feedArea.scrollHeight;
            }, 50);
        });
    }

    
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
            
            scriptDb.onload = () => { initSystem(); };
        };
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadFirebaseAndInit);
    } else {
        loadFirebaseAndInit();
    }
})();
