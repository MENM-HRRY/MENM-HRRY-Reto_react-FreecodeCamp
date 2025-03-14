import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';

function App() {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState('');
  const [showResult, setShowResult] = useState(false);

  // Función para normalizar texto (eliminar acentos)
  const normalizeText = (text: string): string => {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  };

  // Función para verificar si es un palíndromo
  const isPalindrome = (text: string): boolean => {
    const normalizedText = normalizeText(text);
    const cleanText = normalizedText.toLowerCase().replace(/[\W_]/g, '');
    return cleanText === cleanText.split('').reverse().join('');
  };

  const handleCheck = () => {
    if (!inputText.trim()) {
      alert('Please input a value');
      return;
    }

    const message = `${inputText} ${isPalindrome(inputText) ? 'is' : 'is not'} a palindrome`;
    setResult(message);
    setShowResult(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
    setShowResult(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0b1c] flex items-center justify-center p-4">
      <div className="container max-w-2xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-2xl">
          <div className="flex items-center gap-3 mb-8">
            <AlertCircle className="text-purple-600 w-6 h-6" />
            <h1 className="text-2xl font-semibold text-white">Verificador de Palíndromos</h1>
          </div>

          <div className="mb-8">
            <label htmlFor="text-input" className="block text-white mb-4">
              Enter in text to check for a palindrome:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                id="text-input"
                value={inputText}
                onChange={handleInputChange}
                placeholder="Enter text..."
                className="flex-1 px-4 py-3 bg-white/10 border-2 border-purple-900 rounded-lg text-white focus:border-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-700/30 transition-all"
              />
              <button
                onClick={handleCheck}
                className="px-8 py-3 bg-purple-700 hover:bg-purple-600 text-white rounded-lg transition-colors"
              >
                Check
              </button>
            </div>
          </div>

          {showResult && (
            <div
              className={`text-center py-4 px-6 rounded-lg transition-all transform ${
                result.includes('is a')
                  ? 'bg-green-500/20 text-green-300'
                  : 'bg-red-500/20 text-red-300'
              }`}
            >
              {result}
            </div>
          )}

          <div className="mt-8 p-6 bg-teal-900/10 rounded-lg flex items-start gap-4">
            <span role="img" aria-label="light-bulb" className="text-2xl">
              💡
            </span>
            <p className="text-teal-300 leading-relaxed">
              Un <em className="text-teal-200 not-italic font-medium">palíndromo</em> es una palabra o
              frase que se lee igual hacia adelante y hacia atrás, ignorando signos de puntuación,
              acentos, mayúsculas y espacios.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;