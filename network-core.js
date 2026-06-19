(function() {
    // 1. SOCKET.IO İSTEMCİSİNİ GİZLİCE YÜKLE
    const script = document.createElement('script');
    script.src = "https://cdn.socket.io/4.7.2/socket.io.min.js";
    document.head.appendChild(script);

    script.onload = () => {
        // 2. CWP SUNUCUNA BAĞLAN (Kendi IP Adresini Buraya Yaz)
        // DİKKAT: Sonunda '/' olmasın
        const socket = io("http://ftp.agar.live:3000");

        // 3. AKTİF KİŞİ SAYACI GÖRÜNÜMÜ (Sol Alta Ekliyoruz)
        const counterDiv = document.createElement('div');
        counterDiv.id = "global-online-counter";
        counterDiv.innerHTML = `🟢 <span id="online-num">0</span> Kişi Aktif`;
        
        Object.assign(counterDiv.style, {
            position: 'fixed',
            bottom: '20px',
            left: '20px',
            background: 'rgba(0,0,0,0.8)',
            color: '#00ff6a',
            padding: '8px 15px',
            borderRadius: '50px',
            fontFamily: 'Segoe UI, Tahoma, sans-serif',
            fontWeight: 'bold',
            fontSize: '13px',
            boxShadow: '0 4px 10px rgba(0,0,0,0.5)',
            zIndex: '999999',
            border: '1px solid #00ff6a',
            transition: 'transform 0.2s ease'
        });
        
        counterDiv.onmouseover = () => counterDiv.style.transform = 'scale(1.05)';
        counterDiv.onmouseout = () => counterDiv.style.transform = 'scale(1)';
        document.body.appendChild(counterDiv);

        // 4. SUNUCUDAN GELEN ANLIK SAYIYI GÜNCELLE
        socket.on('online_count_update', (count) => {
            const numSpan = document.getElementById('online-num');
            if(numSpan) numSpan.innerText = count;
        });

        // 5. ADMİNDEN GELEN FLASH BİLDİRİM VE YÖNLENDİRME EMRİ
        socket.on('trigger_flash_alert', (data) => {
            // Ekrana tam sayfa, oyun temalı devasa bir bildirim basıyoruz
            const alertDiv = document.createElement('div');
            
            alertDiv.innerHTML = `
                <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(10, 11, 20, 0.95); z-index: 9999999; display: flex; flex-direction: column; align-items: center; justify-content: center; color: white; font-family: 'Segoe UI', Tahoma, sans-serif;">
                    <h1 style="font-size: 36px; color: #00d2ff; text-align: center; margin-bottom: 30px; padding: 0 20px; text-transform: uppercase; letter-spacing: 2px;">🚀 ${data.message}</h1>
                    <a href="${data.url}" target="_blank" style="background: linear-gradient(135deg, #ff0055, #ffaa00); color: white; padding: 18px 50px; font-size: 22px; font-weight: 900; text-decoration: none; border-radius: 50px; box-shadow: 0 0 25px rgba(255, 0, 85, 0.6); transition: transform 0.2s;">
                        HEMEN OYNA
                    </a>
                    <button id="close-flash-btn" style="margin-top: 30px; background: none; border: none; color: #888; font-size: 14px; cursor: pointer; text-decoration: underline;">Şimdilik Geç</button>
                </div>
            `;
            
            document.body.appendChild(alertDiv);

            // Kapatma butonuna işlev ekle
            document.getElementById('close-flash-btn').addEventListener('click', function() {
                alertDiv.remove();
            });
        });
    };
})();
