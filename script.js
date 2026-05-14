const chatBox = document.getElementById('chat-box');
const input = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const loader = document.getElementById('loader');
const aiName = document.getElementById('ai-display-name');
let voiceOn = false;

// Realtime Clock
setInterval(() => {
    document.getElementById('clock').innerText = new Date().toLocaleTimeString();
}, 1000);

function toggleVoice() {
    voiceOn = !voiceOn;
    document.getElementById('voice-btn').innerText = voiceOn ? "🔊" : "🔈";
    if(voiceOn) speak("Suara anime lembut diaktifkan, Tuan Wahyu.");
}

function speak(text) {
    if (!voiceOn) return;
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'id-ID';
    utter.pitch = 1.4; // Suara Lembut Anime
    utter.rate = 1.0;
    synth.speak(utter);
}

function addBubble(text, type) {
    const div = document.createElement('div');
    div.className = `msg ${type}`;
    chatBox.appendChild(div);
    
    if (type === 'bot') {
        let i = 0;
        function typeEffect() {
            if (i < text.length) {
                div.innerHTML += text.charAt(i) === "\n" ? "<br>" : text.charAt(i);
                i++;
                setTimeout(typeEffect, 20); // Kecepatan ngetik sat-set
            } else {
                speak(div.innerText);
            }
            chatBox.scrollTop = chatBox.scrollHeight;
        }
        typeEffect();
    } else {
        div.innerText = text;
        chatBox.scrollTop = chatBox.scrollHeight;
    }
}

async function process(cmd) {
    const p = cmd.toLowerCase();
    loader.classList.remove('hidden'); // Munculkan "Sabar dulu Tuan"

    setTimeout(() => {
        loader.classList.add('hidden');
        
        if (p.includes("ganti nama jadi")) {
            const name = cmd.split("jadi")[1].trim();
            aiName.innerText = name.toUpperCase();
            addBubble(`Haik! Sekarang panggil saya ${name} ya, Tuan Wahyu 🌸.`, 'bot');
        } 
        else if (p.includes("menu") || p.includes("fitur")) {
            addBubble("Tuan Wahyu, ini yang bisa saya lakukan ✨:\n1. Cari Music ID 🎵\n2. Rakit Website & Script 📜\n3. Buat Logo & Wallpaper 🎨\n4. Mode Suara Anime 🔊\n5. Cek Keamanan Link 🛡️", 'bot');
        }
        else if (p.includes("music id")) {
            addBubble("🎵 Menemukan Database Music ID:\n• DJ Santai: 184532xxx\n• Phonk Mix: 542199xxx\nAda lagi yang Tuan cari? 🌸", 'bot');
        }
        else if (p.includes("buat website")) {
            addBubble("🌐 Siap Tuan, ini rakitan website dasarnya:\n<pre>&lt;html&gt;\n &lt;body style='background:black; color:cyan;'&gt;\n  &lt;h1&gt;Project Tuan Wahyu&lt;/h1&gt;\n &lt;/body&gt;\n&lt;/html&gt;</pre>", 'bot');
        }
        else if (p.includes("logo") || p.includes("wallpaper")) {
            const seed = Math.floor(Math.random() * 999);
            addBubble(`🎨 Ini desain khusus untuk Tuan Wahyu:\n<br><img src="https://api.dicebear.com/7.x/bottts/svg?seed=${seed}" style="width:120px; border:2px solid #00f2ff; border-radius:10px;">`, 'bot');
        }
        else if (p.startsWith("cari")) {
            const q = p.replace("cari", "").trim();
            addBubble(`Mencari ${q} di internet... Sabar ya Tuan 🌸.`, 'bot');
            window.open(`https://www.google.com/search?q=${q}`, '_blank');
        }
        else {
            addBubble("Perintah diterima Tuan Wahyu. Saya akan usahakan yang terbaik! ✨🌸", 'bot');
        }
    }, 1500); // Durasi Loading
}

function quickCmd(v) { addBubble(v, 'user'); process(v); }

sendBtn.addEventListener('click', () => {
    if (input.value.trim()) {
        addBubble(input.value, 'user');
        process(input.value);
        input.value = "";
    }
});

input.addEventListener('keypress', (e) => { if(e.key === 'Enter') sendBtn.click(); });
function hapusChat() { chatBox.innerHTML = ""; addBubble("Chat sudah dibersihkan, Tuan 🌸", "bot"); }
