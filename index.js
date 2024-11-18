function swapContent() {
    const yearsSection = document.querySelector('.Years_section');
    const claimSection = document.querySelector('.Claim_section');

    const yearsContent = yearsSection.innerHTML;
    const claimContent = claimSection.innerHTML;

    yearsSection.innerHTML = claimContent;
    claimSection.innerHTML = yearsContent;
}

document.querySelector('.Years_section').addEventListener('click', swapContent);
document.querySelector('.Claim_section').addEventListener('click', swapContent);

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

