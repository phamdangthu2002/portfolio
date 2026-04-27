// === CURSOR ===
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursor-ring');
document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px'; cursor.style.top = e.clientY + 'px';
    cursorRing.style.left = e.clientX + 'px'; cursorRing.style.top = e.clientY + 'px';
});
document.querySelectorAll('a,button,.project-card').forEach(el => {
    el.addEventListener('mouseenter', () => { cursorRing.style.transform = 'translate(-50%,-50%) scale(1.6)'; cursorRing.style.opacity = '1'; });
    el.addEventListener('mouseleave', () => { cursorRing.style.transform = 'translate(-50%,-50%) scale(1)'; cursorRing.style.opacity = '0.6'; });
});

// === CANVAS PARTICLES ===
const canvas = document.getElementById('canvas-bg');
const ctx = canvas.getContext('2d');
let W, H, particles = [];
function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
resize(); window.addEventListener('resize', resize);
for (let i = 0; i < 60; i++) particles.push({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.5 + 0.5, vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3 });
function drawParticles() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0,212,170,0.6)'; ctx.fill();
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
    });
    // draw connections
    particles.forEach((p, i) => particles.slice(i + 1).forEach(q => {
        const d = Math.hypot(p.x - q.x, p.y - q.y);
        if (d < 120) { ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.strokeStyle = `rgba(0,212,170,${0.08 * (1 - d / 120)})`; ctx.stroke(); }
    }));
    requestAnimationFrame(drawParticles);
}
drawParticles();

// === TYPING ANIMATION ===
const rolesVI = ['Backend Developer', 'Laravel Developer', 'PHP Developer', 'RPA Learner (UiPath)', 'Giáo viên Tin học tiểu học'];
const rolesEN = ['Backend Developer', 'Laravel Developer', 'PHP Developer', 'RPA Learner (UiPath)', 'Primary Informatics Teacher'];
let currentLang = 'vi', roleIdx = 0, charIdx = 0, deleting = false;
const typedEl = document.getElementById('typed-role');
function typeRole() {
    const roles = currentLang === 'vi' ? rolesVI : rolesEN;
    const role = roles[roleIdx % roles.length];
    if (!deleting) {
        typedEl.textContent = role.slice(0, charIdx + 1); charIdx++;
        if (charIdx === role.length) { deleting = true; setTimeout(typeRole, 2000); return; }
    } else {
        typedEl.textContent = role.slice(0, charIdx - 1); charIdx--;
        if (charIdx === 0) { deleting = false; roleIdx++; }
    }
    setTimeout(typeRole, deleting ? 60 : 90);
}
typeRole();

// === SCROLL REVEAL ===
const revealEls = document.querySelectorAll('.reveal, .timeline-item');
const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: 0.1 });
revealEls.forEach(el => observer.observe(el));

// === NAV ACTIVE ===
window.addEventListener('scroll', () => {
    const sections = ['hero', 'about', 'experience', 'projects', 'certifications', 'contact'];
    sections.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        const { top } = el.getBoundingClientRect();
        if (top <= 100 && top > -el.offsetHeight + 100) {
            document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
            const link = document.querySelector(`.nav-links a[href="#${id}"]`);
            if (link) link.classList.add('active');
        }
    });
});

// === MOBILE NAV ===
document.getElementById('nav-toggle').addEventListener('click', () => {
    document.getElementById('nav-links').classList.toggle('open');
});

// === LANGUAGE SWITCH ===
const translations = {
    vi: {
        'hero-desc': 'Lập trình viên Backend đam mê xây dựng hệ thống web hiệu quả với Laravel & PHP. Định hướng phát triển theo hướng RPA — tự động hóa quy trình với UiPath, mang lại giá trị thực cho doanh nghiệp. Tôi có chứng chỉ nghiệp vụ sư phạm tiểu học (Tin học), đồng thời luôn sẵn sàng học nhanh, thích nghi tốt và đóng góp bằng những giải pháp thực tế, ổn định cho doanh nghiệp và nhà nước.',
        'about-p1': 'Tôi là Phạm Đăng Thư, sinh viên ngành Công nghệ Thông tin tốt nghiệp tại Đại học Tây Đô. Với nền tảng vững chắc về lập trình backend, tôi đam mê xây dựng các hệ thống web hiệu quả và có khả năng mở rộng.',
        'about-p2': 'Hiện tại, tôi đang tích cực nghiên cứu và học hỏi về RPA (Robotic Process Automation) với UiPath — một lĩnh vực đang tăng trưởng mạnh và có tiềm năng lớn trong việc tự động hóa quy trình doanh nghiệp. Tôi tin tưởng vào việc học hỏi liên tục và muốn gắn bó lâu dài với công ty để cùng phát triển.',
        'about-p3': 'Ngoài công việc lập trình, tôi cũng có chứng chỉ nghiệp vụ sư phạm tiểu học và chứng chỉ chức danh nghề nghiệp giáo viên tiểu học, cho thấy sự đa dạng trong sở thích và kỹ năng của tôi. Tôi luôn sẵn sàng đón nhận thử thách mới và mong muốn đóng góp giá trị thực cho bộ giáo dục.',
        'about-loc': 'TP. Cao Lãnh, Đồng Tháp',
        'about-role': 'Backend Developer / RPA Developer / Giáo viên Tin học tiểu học',
        'exp1-desc': '<ul><li>Xây dựng website thương mại điện tử đầy đủ chức năng: tìm kiếm sản phẩm, đăng ký, đăng nhập, quản lý giỏ hàng.</li><li>Triển khai hệ thống phân quyền 3 cấp (Admin, Staff, User) để quản lý sản phẩm, danh mục và tài khoản.</li><li>Thiết kế hệ thống bảo mật trang quản trị rõ ràng và hiệu quả.</li></ul>',
        'edu-desc': '<ul><li>Học lập trình hướng đối tượng, cơ sở dữ liệu, mạng máy tính, kỹ thuật phần mềm.</li><li>Thực hành nhiều dự án cá nhân và nhóm trong suốt quá trình học.</li><li>Đạt chứng chỉ tiếng Anh B1 năm 2024.</li></ul>',
        'rpa-desc': '<ul><li>Nghiên cứu UiPath RE Framework, best practices và coding standards.</li><li>Học xử lý ngoại lệ (exception handling), LINQ, Regular Expression trong UiPath.</li><li>Theo dõi xu hướng công nghệ RPA và ứng dụng thực tiễn trong doanh nghiệp.</li></ul>',
        'proj1-desc': 'Website TMĐT cho phép tìm kiếm sản phẩm, đăng ký/đăng nhập và quản lý giỏ hàng. Hệ thống phân quyền 3 cấp (Admin, Staff, User).',
        'proj2-desc': 'Tích hợp RESTful API, AngularJS frontend mượt mà, phân quyền truy cập, tìm kiếm theo tên và danh mục.',
        'proj3-desc': 'Đăng nhập, theo dõi đơn hàng, lịch sử mua hàng, thanh toán trực tuyến. Hệ thống quản lý đơn hàng hoàn chỉnh.',
        'contact-loc': 'TP. Cao Lãnh, Đồng Tháp',
        'contact-msg-text': 'Tôi đang tìm kiếm cơ hội tham gia các dự án thực tế để phát triển kỹ năng backend, RPA, sư phạm. Nếu bạn có cơ hội phù hợp hoặc muốn cùng nhau xây dựng điều gì đó thú vị, hãy liên hệ với tôi!',
    },
    en: {
        'hero-desc': 'Backend Developer passionate about building efficient web systems with Laravel & PHP. Targeting RPA development — automating business processes with UiPath to deliver real value for enterprises. I also hold a primary school pedagogy certificate in Informatics and am always ready to learn quickly, adapt well, and contribute practical, stable solutions for businesses and public organizations.',
        'about-p1': 'I am Pham Dang Thu, an Information Technology graduate from Tay Do University. With a strong foundation in backend programming, I am passionate about building efficient and scalable web systems.',
        'about-p2': 'Currently, I am actively researching and learning about RPA (Robotic Process Automation) with UiPath — a rapidly growing field with great potential for automating business processes. I believe in continuous learning and aim to grow long-term with a great company.',
        'about-p3': 'In addition to programming, I also hold a primary school pedagogy certificate and a professional title certificate for primary school teachers, reflecting the diversity of my interests and skills. I am always ready to embrace new challenges and contribute meaningful value to the education sector.',
        'about-loc': 'Cao Lanh City, Dong Thap',
        'about-role': 'Backend Developer / RPA Developer / Primary Informatics Teacher',
        'exp1-desc': '<ul><li>Built a full-featured e-commerce website: product search, registration, login, and shopping cart management.</li><li>Implemented a 3-tier permission system (Admin, Staff, User) to manage products, categories, and accounts.</li><li>Designed a clear security system for the admin panel.</li></ul>',
        'edu-desc': '<ul><li>Studied OOP, databases, computer networks, and software engineering.</li><li>Completed multiple personal and group projects throughout the program.</li><li>Achieved English B1 certification in 2024.</li></ul>',
        'rpa-desc': '<ul><li>Studied UiPath RE Framework, best practices and coding standards.</li><li>Learned exception handling, LINQ, and Regular Expressions in UiPath.</li><li>Following RPA technology trends and real-world enterprise applications.</li></ul>',
        'proj1-desc': 'E-commerce website with product search, registration/login and cart management. 3-tier permission system (Admin, Staff, User).',
        'proj2-desc': 'Integrated RESTful API, smooth AngularJS frontend, access control, search by name and category.',
        'proj3-desc': 'Login, order tracking, purchase history, online payment. Complete order management system.',
        'contact-loc': 'Cao Lanh City, Dong Thap',
        'contact-msg-text': "I'm looking for opportunities to join real-world projects to develop my backend, RPA, and teaching skills. If you have a suitable opportunity or want to build something meaningful together, don't hesitate to reach out!",
    }
};

function setLang(lang) {
    currentLang = lang;
    document.documentElement.lang = lang === 'vi' ? 'vi' : 'en';
    document.getElementById('btn-vi').classList.toggle('active', lang === 'vi');
    document.getElementById('btn-en').classList.toggle('active', lang === 'en');

    // Update data-vi/data-en elements
    document.querySelectorAll('[data-vi]').forEach(el => {
        el.textContent = el.getAttribute('data-' + lang) || el.textContent;
    });

    // Update innerHTML elements
    const t = translations[lang];
    for (const [id, html] of Object.entries(t)) {
        const el = document.getElementById(id);
        if (el) { if (html.startsWith('<')) el.innerHTML = html; else el.textContent = html; }
    }
}
