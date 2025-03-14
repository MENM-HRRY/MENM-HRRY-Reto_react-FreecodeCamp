// Elementos del DOM
const textInput = document.getElementById('text-input');
const checkButton = document.getElementById('check-btn');
const resultDiv = document.getElementById('result');

// Función para normalizar texto (eliminar acentos)
function normalizeText(text) {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function isPalindrome(text) {
    const normalizedText = text
        .normalize('NFD')  // Descompone caracteres acentuados (ej: 'á' → 'a' + '´')
        .replace(/[\u0300-\u036f]/g, '')  // Elimina diacríticos
        .toLowerCase()  // Convierte a minúsculas
        .replace(/[^\p{L}\p{N}]/gu, '');  // Elimina caracteres no alfanuméricos (admite Unicode)

    const reversedText = normalizedText.split('').reverse().join('');
    return normalizedText === reversedText;
}



// Función para mostrar el resultado con animación
function showResult(text, isPalindrome) {
    const message = `${text} ${isPalindrome ? 'es un palíndromo' : 'no es un palíndromo'}`;
    resultDiv.textContent = message;
    resultDiv.className = isPalindrome ? 'success show' : 'error show';
}


// Manejador del evento click del botón
checkButton.addEventListener('click', () => {
    const text = textInput.value.trim();
    
    // Validar que se haya ingresado un texto
    if (!text) {
        alert('Por favor escribe algo la caja de texto esta vacia');
        return;
    }
    
    // Verificar si es palíndromo y mostrar resultado
    showResult(text, isPalindrome(text));
});

// Manejador del evento keypress para permitir verificar con Enter
textInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        checkButton.click();
    }
});

// Limpiar la clase 'show' cuando se comienza a escribir nuevo texto
textInput.addEventListener('input', () => {
    resultDiv.className = '';
});