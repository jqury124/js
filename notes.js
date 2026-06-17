(function() {
  
    const API_URL = "https://mathlesson.help"; 

   
    const styles = `
        #collab-btn-trigger {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #1a73e8; 
            color: white;
            padding: 12px 20px;
            border-radius: 30px;
            cursor: pointer;
            box-shadow: 0 4px 10px rgba(0,0,0,0.2);
            font-family: Arial, sans-serif;
            font-weight: bold;
            font-size: 14px;
            z-index: 99999;
            transition: 0.3s;
            display: none;  
        }
        #collab-btn-trigger:hover { transform: scale(1.05); }

        #draft-workspace-panel {
            position: fixed;
            bottom: 10px; 
            right: 20px;
            width: 320px;
            height: 450px;
            background: #fff;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.3);
            display: flex;  
            flex-direction: column;
            font-family: Arial, sans-serif;
            z-index: 99999;
            border: 1px solid #dadce0;
            overflow: hidden;
        }

        .panel-top-bar {
            background: #f8f9fa;
            padding: 15px;
            border-bottom: 1px solid #dadce0;
            color: #202124;
            font-weight: bold;
            font-size: 14px;
            display: flex;
            justify-content: space-between;
            cursor: pointer;
        }
        .panel-top-bar:hover { background: #f1f3f4; }
        
        #data-sync-container {
            flex: 1;
            padding: 15px;
            overflow-y: auto;
            font-size: 13px;
            background: #fff;
            color: #202124; 
        }

        #draft-input-buffer {
            border: none;
            border-top: 1px solid #dadce0;
            padding: 15px;
            outline: none;
            width: 100%;
            box-sizing: border-box;
            font-family: inherit;
            font-size: 13px;
        }
        #draft-input-buffer::placeholder { color: #bdc1c6; font-style: italic; }

        #data-sync-container::-webkit-scrollbar { width: 6px; }
        #data-sync-container::-webkit-scrollbar-thumb { background: #dadce0; border-radius: 10px; }
    `;

     
    const htmlContent = `
        <div id="collab-btn-trigger">📝 Quick Notes</div>
        <div id="draft-workspace-panel">
            <div class="panel-top-bar" id="collab-panel-close">
                <span>Collaborative Draft</span>
                <span style="color: #5f6368;" title="Kapat">✖</span>
            </div>
            <div id="data-sync-container"></div>
            <input type="text" id="draft-input-buffer" maxlength="500" placeholder="Type a note... (Press Enter)" autocomplete="off">
        </div>
    `;

    
    function initCollabWorkspace() {
        if (!document.getElementById('collab-workspace-styles')) {
            const styleElement = document.createElement('style');
            styleElement.id = 'collab-workspace-styles';
            styleElement.innerHTML = styles;
            document.head.appendChild(styleElement);
        }

        if (!document.getElementById('draft-workspace-panel')) {
            const wrapper = document.createElement('div');
            wrapper.innerHTML = htmlContent;
            document.body.appendChild(wrapper);
        }

        const wsPanel = document.getElementById('draft-workspace-panel');
        const wsTrigger = document.getElementById('collab-btn-trigger');
        const closeBar = document.getElementById('collab-panel-close');
        const syncBox = document.getElementById('data-sync-container');
        const draftInput = document.getElementById('draft-input-buffer');
        let syncTimerId = null;

        function syncDraftData() {
           
            fetch(`${API_URL}/api_sync.php?action=fetch`, { credentials: 'include' })
            .then(res => res.text())
            .then(data => {
                const isAtBottom = syncBox.scrollHeight - syncBox.clientHeight <= syncBox.scrollTop + 1;
                syncBox.innerHTML = data;
                if (isAtBottom) {
                    syncBox.scrollTop = syncBox.scrollHeight;
                }
            }).catch(err => console.error("Chat bağlantı hatası:", err));
        }

        
        syncDraftData();
        syncTimerId = setInterval(syncDraftData, 2000);

        function toggleWorkspace() {
            if (window.getComputedStyle(wsPanel).display !== 'none') {
                wsPanel.style.display = 'none';
                wsTrigger.style.display = 'block'; 
                clearInterval(syncTimerId);
            } else {
                wsPanel.style.display = 'flex';
                wsTrigger.style.display = 'none'; 
                syncDraftData(); 
                syncTimerId = setInterval(syncDraftData, 2000); 
                draftInput.focus(); 
            }
        }

        wsTrigger.addEventListener('click', toggleWorkspace);
        closeBar.addEventListener('click', toggleWorkspace);

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && window.getComputedStyle(wsPanel).display !== 'none') {
                toggleWorkspace();
            }
        });

        draftInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter' && this.value.trim() !== '') {
                const formData = new FormData();
                formData.append('msg', this.value);
                
                
                fetch(`${API_URL}/api_sync.php?action=send`, {
                    method: 'POST',
                    body: formData,
                    credentials: 'include'
                }).then(() => {
                    this.value = ''; 
                    syncDraftData(); 
                }).catch(err => console.error("Mesaj gönderme hatası:", err));
            }
        });
    }

    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCollabWorkspace);
    } else {
        initCollabWorkspace();
    }

})();
