let hasSwapped = false;

function swapContent() {
    if (hasSwapped) return; // Перевірка, чи вже виконувалася функція
    const yearsSection = document.querySelector('.Years_section');
    const claimSection = document.querySelector('.Claim_section');

    const yearsContent = yearsSection.innerHTML;
    const claimContent = claimSection.innerHTML;

    yearsSection.innerHTML = claimContent;
    claimSection.innerHTML = yearsContent;

    hasSwapped = true; // Позначаємо, що контент був змінений
}

// Викликаємо swapContent() тільки один раз при завантаженні сторінки
document.addEventListener('DOMContentLoaded', function() {
    swapContent(); // Це викликається при завантаженні сторінки
});


function calculateTriangleArea() {
    const base = 1;
    const height = 1.5;
    const area = 0.5 * base * height;
    
    const portraitSection = document.querySelector('.Portrait');
    
    const resultElement = document.createElement('div');
    resultElement.textContent = `Площа носа Генріха 7 на фото: ${area} см^2`;
    resultElement.style.marginTop = "10px"; 
    
    portraitSection.appendChild(resultElement);
}

calculateTriangleArea();

function findMin() {
    const inputValue = document.getElementById('numbersInput').value.trim();
    
    const numbers = inputValue.split(/\s+/).map(num => Number(num));
    
    if (numbers.length !== 10 || numbers.some(isNaN)) {
        alert("Будь ласка, введіть рівно 10 чисел через пробіл.");
        return;
    }
    
    const minNumber = Math.min(...numbers);
    alert(`Мінімальне число: ${minNumber}`);
    document.cookie = `minValue=${minNumber}; path=/`;
    document.querySelector('.number-input-form').style.display = 'none';
}

function checkCookies() {
    const cookies = document.cookie.split(';');
    let minValueCookie = cookies.find(cookie => cookie.trim().startsWith('minValue='));
    
    if (minValueCookie) {
        const minValue = minValueCookie.split('=')[1];
        if (confirm(`Збережене мінімальне значення: ${minValue}. Після натискання "ОК", дані будуть видалені з cookies.`)) {
            document.cookie = 'minValue=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'; 
            alert('Cookies видалено.');
            document.querySelector('.number-input-form').style.display = 'block'; // Показуємо форму
        }
    } else {
        document.querySelector('.number-input-form').style.display = 'block';
    }
}

window.onload = checkCookies;

window.addEventListener('load', function() {
    const portrait = document.querySelector('.Portrait');
    const colorPicker = document.getElementById('colorPicker');
    const savedColor = localStorage.getItem('portraitTextColor');
    
    if (savedColor) {
        portrait.style.color = savedColor;
        colorPicker.value = savedColor; 
    }

    colorPicker.addEventListener('input', function() {
        const selectedColor = colorPicker.value;
        portrait.style.color = selectedColor;
        localStorage.setItem('portraitTextColor', selectedColor);
    });
});

function showForm(sectionName) {
    const section = document.querySelector(`.${sectionName}`);
    const formContainer = section.querySelector('.form-container');
    formContainer.style.display = formContainer.style.display === 'none' ? 'block' : 'none';
}

function addItem(sectionName) {
    const section = document.querySelector(`.${sectionName}`);
    const input = section.querySelector('input[type="text"]:not(.numbers)');
    const data = input.value.trim();

    if (!data) {
        alert('Будь ласка, введіть дані через кому.');
        return;
    }

    const items = data.split(',').map(item => item.trim()).filter(item => item);

    if (items.length === 0) {
        alert('Дані для списку не знайдено.');
        return;
    }

    // Створення ненумерованого списку
    const ul = document.createElement('ul');
    items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        ul.appendChild(li);
    });

    section.innerHTML = '';
    section.appendChild(ul);

    const storageKey = `${sectionName}_list`;
    localStorage.setItem(storageKey, JSON.stringify(items));
}

function restoreSections() {
    const sections = ['Menu', 'Achievements', 'Portrait', 'Years_section', 'Claim_section', 'Biography_section'];

    sections.forEach(sectionName => {
        const storageKey = `${sectionName}_list`;
        const savedData = localStorage.getItem(storageKey);

        if (savedData) {
            const section = document.querySelector(`.${sectionName}`);
            const items = JSON.parse(savedData);

            const ul = document.createElement('ul');
            items.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
                ul.appendChild(li);
            });

            section.innerHTML = '';
            section.appendChild(ul);

            localStorage.removeItem(storageKey);
        }
    });
}
