(function() {
    const styles = `
        #custom-network-bar {
            width: 160px; /* Genişlik 160px */
            height: 600px; /* Yükseklik 600px */
            display: block;
            z-index: 99999;
            position: fixed; /* Ekranda sabit */
            top: 50%; /* Dikeyde ortala */
            left: 0; /* Ekranın soluna yasla */
            background: linear-gradient(180deg, #000 0%, #1a1a1a 50%, #000 100%);
            border-right: 1px solid rgba(255, 255, 255, 0.15);
            box-shadow: 4px 0 10px rgba(0,0,0,0.5);
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            transition: all 0.4s ease-in-out;
            transform: translateY(-50%);
            border-radius: 0 10px 10px 0; /* Sağ köşelere hafif kavis */
        }

        #custom-network-bar.hide-animated {
            transform: translate(-100%, -50%); /* Kapatınca sola doğru kaybolur */
            opacity: 0;
        }

        #custom-network-bar .network-inner {
            display: flex;
            flex-direction: column; /* İçerikleri alt alta diz */
            align-items: center;
            height: 100%;
            padding: 15px 0;
            max-width: 100%;
            overflow: hidden;
            box-sizing: border-box;
        }

        #custom-network-bar .brand-logo {
            font-size: 13px; /* Dikey alana sığması için küçültüldü */
            font-weight: 900;
            text-transform: uppercase;
            font-style: italic;
            letter-spacing: 0.5px;
            margin-bottom: 10px; /* Alt boşluk */
            text-align: center;
            background: linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000);
            background-size: 400% auto;
            -webkit-background-clip: text;
            text-fill-color: transparent;
            -webkit-text-fill-color: transparent;
            white-space: normal; /* Uzun metni alt satıra at */
            cursor: pointer;
            animation: rainbowMove 3s linear infinite;
            padding: 0 10px;
        }

        @keyframes rainbowMove {
            0% { background-position: 0% center; }
            100% { background-position: 400% center; }
        }

        #custom-network-bar .divider {
            width: 80%; /* Çizgi artık yatay */
            height: 1px;
            background: rgba(255,255,255,0.2);
            margin: 10px 0;
            flex-shrink: 0;
        }

        #custom-network-bar .network-links {
            display: flex;
            flex-direction: column; /* Linkleri alt alta yap */
            align-items: center;
            gap: 10px;
            overflow-y: auto; /* Dikey kaydırma */
            overflow-x: hidden;
            width: 100%;
            flex: 1;
            scrollbar-width: none;  
            -ms-overflow-style: none;
            padding: 0 10px;
            box-sizing: border-box;
        }

        #custom-network-bar .network-links::-webkit-scrollbar {
            display: none;  
        }

        #custom-network-bar .net-btn {
            text-decoration: none;
            color: #fff;
            font-weight: 700;
            font-size: 11px; /* Genişliğe sığması için */
            padding: 8px 10px;
            border-radius: 50px;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.15);
            transition: all 0.2s ease;
            white-space: nowrap;
            display: flex;
            align-items: center;
            justify-content: center; /* İkon ve metni ortala */
            width: 100%; /* Kapsayıcıyı doldur */
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
            margin-top: 10px; /* Boşluk üste alındı */
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

        #floating-wrapper {
            position: fixed;
            bottom: 25px;
            right: 25px;
            z-index: 999999;
            transition: all 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55);
        }

        #floating-wrapper.hide-animated {
            transform: scale(0) rotate(15deg);
            opacity: 0;
        }

        #floating
