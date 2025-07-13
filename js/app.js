document.addEventListener("DOMContentLoaded", () => {
    // Elementos del DOM
    const input = document.getElementById("input");
    const output = document.getElementById("output");
    const copyButton = document.getElementById("button--copy");
    const clearButton = document.getElementById("button--clear");
    const downloadButton = document.getElementById("dwn-btn");
    const shareButton = document.getElementById("share-btn");
    const fileInput = document.getElementById("file-input");
    const themeToggle = document.getElementById("theme-toggle");
    const themeIcon = document.getElementById("theme-icon");
    const algorithmSelector = document.getElementById("algorithm-selector");
    const historyToggle = document.getElementById("history-toggle");
    const algorithmModal = document.getElementById("algorithm-modal");
    const historyModal = document.getElementById("history-modal");
    const modalClose = document.getElementById("modal-close");
    const historyModalClose = document.getElementById("history-modal-close");
    let caesarShift = 3;
    const caesarControls = document.getElementById("caesar-controls");
    const caesarShiftInput = document.getElementById("caesar-shift");
    const clearHistoryBtn = document.getElementById("clear-history-btn");
    const exportJsonBtn = document.getElementById("export-json-btn");
    const exportCsvBtn = document.getElementById("export-csv-btn");
    const exportXmlBtn = document.getElementById("export-xml-btn");
    const textAnalysis = document.getElementById("text-analysis");
    const saveHistoryBtn = document.getElementById("save-history-btn");

    // Estado de la aplicación
    let currentAlgorithm = 'basic';
    let conversionHistory = JSON.parse(localStorage.getItem('conversionHistory') || '[]');
    let conversionCount = parseInt(localStorage.getItem('conversionCount') || '0');
    let startTime = Date.now();

    // Algoritmos de codificación
    const algorithms = {
        basic: {
            name: 'Básico',
            description: 'Conversión simple de caracteres a símbolos',
            charMap: {
                "a": "¢", "b": "£", "c": "¤", "d": "¥", "e": "¦", "f": "§", "g": "►", "h": "©", "i": "ª", "j": "«", "k": "¬", 
                "l": "®", "m": "¯", "n": "°", "ñ": "±", "o": "²", "p": "³", "q": "µ", "r": "¶", "s": "·", "t": "¹", "u": "º", 
                "v": "»", "w": "¼", "x": "½", "y": "¾", "z": "ø", "A": "¢^", "B": "£^", "C": "¤^", "D": "¥^", "E": "¦^", "F": "§^", 
                "G": "►^", "H": "©^", "I": "ª^", "J": "«^", "K": "¬^", "L": "®^", "M": "¯^", "N": "°^", "Ñ": "±^", "O": "²^", 
                "P": "³^", "Q": "µ^", "R": "¶^", "S": "·^", "T": "¹^", "U": "º^", "V": "»^", "W": "¼^", "X": "½^", "Y": "¾^", 
                "Z": "ø^", "Á": "¢´", "É": "¦´", "Í": "ª´", "Ó": "²´", "Ú": "º´", "á": "¢´", "é": "¦´", "í": "ª´", "ó": "²´", 
                "ú": "º´", "Ü": "º¨", "ü": "º¨", " ": "&"
            },
            reverseCharMap: {
                "¢": "a", "£": "b", "¤": "c", "¥": "d", "¦": "e", "§": "f", "►": "g", "©": "h", "ª": "i", "«": "j", "¬": "k", 
                "®": "l", "¯": "m", "°": "n", "±": "ñ", "²": "o", "³": "p", "µ": "q", "¶": "r", "·": "s", "¹": "t", "º": "u", 
                "»": "v", "¼": "w", "½": "x", "¾": "y", "ø": "z", "¢^": "A", "£^": "B", "¤^": "C", "¥^": "D", "¦^": "E", "§^": "F", 
                "►^": "G", "©^": "H", "ª^": "I", "«^": "J", "¬^": "K", "®^": "L", "¯^": "M", "°^": "N", "±^": "Ñ", "²^": "O", 
                "³^": "P", "µ^": "Q", "¶^": "R", "·^": "S", "¹^": "T", "º^": "U", "»^": "V", "¼^": "W", "½^": "X", "¾^": "Y", 
                "ø^": "Z", "¢´": "á", "¦´": "é", "ª´": "í", "²´": "ó", "º´": "ú", "º¨": "ü", "&": " "
            }
        },
        reverse: {
            name: 'Reverso',
            description: 'Invierte el texto y aplica codificación',
            transform: (text) => text.split('').reverse().join(''),
            reverse: (text) => text.split('').reverse().join('')
        },
        shift: {
            name: 'Desplazamiento',
            description: 'Desplaza caracteres por posiciones (personalizable)',
            transform: (text) => {
                return text.split('').map(char => {
                    if (char.match(/[a-zA-Z]/)) {
                        const code = char.charCodeAt(0);
                        const isUpper = code >= 65 && code <= 90;
                        const base = isUpper ? 65 : 97;
                        const shifted = ((code - base + caesarShift) % 26) + base;
                        return String.fromCharCode(shifted);
                    }
                    return char;
                }).join('');
            },
            reverse: (text) => {
                return text.split('').map(char => {
                    if (char.match(/[a-zA-Z]/)) {
                        const code = char.charCodeAt(0);
                        const isUpper = code >= 65 && code <= 90;
                        const base = isUpper ? 65 : 97;
                        const shifted = ((code - base - caesarShift + 26) % 26) + base;
                        return String.fromCharCode(shifted);
                    }
                    return char;
                }).join('');
            }
        },
        binary: {
            name: 'Binario',
            description: 'Convierte a representación binaria',
            transform: (text) => {
                return text.split('').map(char => {
                    return char.charCodeAt(0).toString(2).padStart(8, '0');
                }).join(' ');
            },
            reverse: (text) => {
                try {
                    // Limpiar el texto de caracteres extraños y normalizar espacios
                    const cleanText = text.replace(/[^01\s]/g, '').replace(/\s+/g, ' ').trim();
                    if (!cleanText) return '';
                    
                    // Dividir por espacios y filtrar cadenas vacías
                    const binaryChunks = cleanText.split(' ').filter(chunk => chunk.length > 0);
                    
                    return binaryChunks.map(binary => {
                        // Asegurar que cada chunk tenga 8 bits
                        const paddedBinary = binary.padEnd(8, '0').substring(0, 8);
                        const charCode = parseInt(paddedBinary, 2);
                        return String.fromCharCode(charCode);
                    }).join('');
                } catch (error) {
                    return 'Error al decodificar binario';
                }
            }
        },
        morse: {
            name: 'Morse',
            description: 'Convierte texto a código Morse y viceversa',
            morseMap: {
                'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---',
                'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-',
                'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--', 'Z': '--..',
                '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.',
                '.': '.-.-.-', ',': '--..--', '?': '..--..', '!': '-.-.--', ' ': '/', '-': '-....-', '/': '-..-.', '(': '-.--.', ')': '-.--.-',
                '&': '.-...', ':': '---...', ';': '-.-.-.', '=': '-...-', '+': '.-.-.', '_': '..--.-', '"': '.-..-.', '$': '...-..-', '@': '.--.-.'
            },
            transform: function(text) {
                // Normalizar tildes y dieresis
                const normalized = text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ñ/gi, 'n');
                return normalized.toUpperCase().split('').map(c => this.morseMap[c] || c).join(' ');
            },
            reverse: function(text) {
                const reverseMap = Object.fromEntries(Object.entries(this.morseMap).map(([k,v])=>[v,k]));
                return text.split(' ').map(code => reverseMap[code] || code).join('');
            }
        }
    };

    // Sistema de notificaciones
    const notificationSystem = {
        show: (message, type = 'success', duration = 3000) => {
            const notification = document.createElement('div');
            notification.className = `notification ${type}`;
            notification.textContent = message;
            
            const container = document.getElementById('notification-container');
            container.appendChild(notification);
            
            setTimeout(() => {
                notification.classList.add('show');
            }, 100);
            
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    container.removeChild(notification);
                }, 300);
            }, duration);
        }
    };

    // Sistema de tema
    const themeSystem = {
        init: () => {
            const savedTheme = localStorage.getItem('theme') || 'light';
            document.documentElement.setAttribute('data-theme', savedTheme);
            themeSystem.updateIcon(savedTheme);
        },
        
        toggle: () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            themeSystem.updateIcon(newTheme);
            
            notificationSystem.show(`Modo ${newTheme === 'dark' ? 'oscuro' : 'claro'} activado`);
        },
        
        updateIcon: (theme) => {
            themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    };

    // Sistema de estadísticas
    const statsSystem = {
        update: () => {
            const text = input.value;
            const characters = text.length;
            const words = text.trim() ? text.trim().split(/\s+/).length : 0;
            
            document.getElementById('characters-count').textContent = characters;
            document.getElementById('words-count').textContent = words;
            document.getElementById('conversions-count').textContent = conversionCount;
            // Análisis de texto avanzado
            textAnalysis.innerHTML = '';
            if (text.trim()) {
                const freq = {};
                for (const char of text.replace(/\s/g, '')) freq[char] = (freq[char]||0)+1;
                const sorted = Object.entries(freq).sort((a,b)=>b[1]-a[1]);
                let html = '<div class="stat-card"><div class="stat-label">Frecuencia de caracteres</div><div style="display:flex;flex-wrap:wrap;gap:0.5rem;">';
                sorted.slice(0,10).forEach(([char, count]) => {
                    html += `<span style="background:var(--bg-secondary);padding:0.3rem 0.6rem;border-radius:8px;">${char}: ${count}</span>`;
                });
                html += '</div></div>';
                textAnalysis.innerHTML = html;
            }
        },
        
        incrementConversions: () => {
            conversionCount++;
            localStorage.setItem('conversionCount', conversionCount.toString());
            statsSystem.update();
        }
    };

    // Sistema de historial
    const historySystem = {
        add: (input, output, algorithm) => {
            const historyItem = {
                id: Date.now(),
                input: input.substring(0, 100) + (input.length > 100 ? '...' : ''),
                output: output.substring(0, 100) + (output.length > 100 ? '...' : ''),
                algorithm: algorithm,
                timestamp: new Date().toLocaleString('es-ES')
            };
            
            conversionHistory.unshift(historyItem);
            if (conversionHistory.length > 50) {
                conversionHistory = conversionHistory.slice(0, 50);
            }
            
            localStorage.setItem('conversionHistory', JSON.stringify(conversionHistory));
        },
        
        display: () => {
            const historyList = document.getElementById('history-list');
            historyList.innerHTML = '';
            
            if (conversionHistory.length === 0) {
                historyList.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">No hay conversiones en el historial</p>';
                return;
            }
            
            conversionHistory.forEach(item => {
                const historyItem = document.createElement('div');
                historyItem.className = 'history-item';
                historyItem.innerHTML = `
                    <h4>${algorithms[item.algorithm]?.name || item.algorithm}</h4>
                    <p><strong>Entrada:</strong> ${item.input}</p>
                    <p><strong>Salida:</strong> ${item.output}</p>
                    <p><strong>Fecha:</strong> ${item.timestamp}</p>
                `;
                historyList.appendChild(historyItem);
            });
        },
        clear: () => {
            conversionHistory = [];
            localStorage.removeItem('conversionHistory');
            historySystem.display();
            notificationSystem.show('Historial borrado');
        },
        export: (format) => {
            let data = '';
            if (format === 'json') {
                data = JSON.stringify(conversionHistory, null, 2);
            } else if (format === 'csv') {
                data = 'Algoritmo,Entrada,Salida,Fecha\n' + conversionHistory.map(h => `"${h.algorithm}","${h.input.replace(/"/g,'""')}","${h.output.replace(/"/g,'""')}","${h.timestamp}"`).join('\n');
            } else if (format === 'xml') {
                data = '<historial>\n' + conversionHistory.map(h =>
                    `<item>\n  <algoritmo>${h.algorithm}</algoritmo>\n  <entrada>${h.input}</entrada>\n  <salida>${h.output}</salida>\n  <fecha>${h.timestamp}</fecha>\n</item>`
                ).join('\n') + '\n</historial>';
            }
            const blob = new Blob([data], {type: format==='json'?'application/json':format==='csv'?'text/csv':'application/xml'});
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `historial.${format}`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            notificationSystem.show(`Historial exportado como ${format.toUpperCase()}`);
        }
    };

    // Sistema de modales
    const modalSystem = {
        show: (modalId) => {
            const modal = document.getElementById(modalId);
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        },
        
        hide: (modalId) => {
            const modal = document.getElementById(modalId);
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        },
        
        init: () => {
            // Cerrar modal al hacer clic fuera
            document.addEventListener('click', (e) => {
                if (e.target.classList.contains('modal')) {
                    modalSystem.hide(e.target.id);
                }
            });
            
            // Cerrar con Escape
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    const openModals = document.querySelectorAll('.modal.show');
                    openModals.forEach(modal => {
                        modalSystem.hide(modal.id);
                    });
                }
            });
        }
    };

    // Función principal de transformación
    const transformText = (text) => {
        if (!text.trim()) return '';
        
        const algorithm = algorithms[currentAlgorithm];
        
        if (algorithm.charMap) {
            // Algoritmo básico
            const isEncoded = Object.keys(algorithm.reverseCharMap).some(key => text.includes(key));
            const map = isEncoded ? algorithm.reverseCharMap : algorithm.charMap;
            
            let transformedText = "";
            for (let i = 0; i < text.length; i++) {
                const char = text[i];
                const nextChar = text[i + 1];
                if (char + nextChar in map) {
                    transformedText += map[char + nextChar];
                    i++;
                } else if (char in map) {
                    transformedText += map[char];
                } else {
                    transformedText += char;
                }
            }
            return transformedText;
        } else if (algorithm.transform && algorithm.reverse) {
            // Otros algoritmos
            if (currentAlgorithm === 'morse') {
                // Detección mejorada para Morse
                const trimmedText = text.trim();
                // Verifica si el texto contiene principalmente puntos y guiones
                const morsePattern = /^[\s\.\-/]+$/;
                const hasMorseChars = /[\.\-]/.test(trimmedText);
                const isMorse = morsePattern.test(trimmedText) && hasMorseChars;
                return isMorse ? algorithm.reverse(text) : algorithm.transform(text);
            } else if (currentAlgorithm === 'binary') {
                // Detección mejorada para Binario
                const trimmedText = text.trim();
                // Verifica si el texto contiene principalmente 0s y 1s separados por espacios
                const binaryPattern = /^[01\s]+$/;
                const hasBinaryChars = /[01]/.test(trimmedText);
                
                // Verificación adicional: al menos el 70% del texto debe ser 0s y 1s
                const binaryChars = (trimmedText.match(/[01]/g) || []).length;
                const totalChars = trimmedText.replace(/\s/g, '').length;
                const binaryPercentage = totalChars > 0 ? binaryChars / totalChars : 0;
                
                const isBinary = binaryPattern.test(trimmedText) && hasBinaryChars && binaryPercentage >= 0.7;
                return isBinary ? algorithm.reverse(text) : algorithm.transform(text);
            } else if (currentAlgorithm === 'shift') {
                // Detectar si es reverso (solo letras)
                // Si el texto parece cifrado, decodifica
                // Aquí lo dejamos manual, siempre codifica
                return algorithm.transform(text);
            } else {
                return algorithm.transform(text);
            }
        } else {
            return text;
        }
    };

    // Función principal de ejecución
    const execute = () => {
        const text = input.value;
        const result = transformText(text);
        output.value = result;
        
        // Mostrar notificación de detección automática
        if (text.trim()) {
            const algorithm = algorithms[currentAlgorithm];
            if (currentAlgorithm === 'morse') {
                const trimmedText = text.trim();
                const morsePattern = /^[\s\.\-/]+$/;
                const hasMorseChars = /[\.\-]/.test(trimmedText);
                const isMorse = morsePattern.test(trimmedText) && hasMorseChars;
                if (isMorse) {
                    notificationSystem.show('Texto Morse detectado - decodificando', 'success');
                }
            } else if (currentAlgorithm === 'binary') {
                const trimmedText = text.trim();
                const binaryPattern = /^[01\s]+$/;
                const hasBinaryChars = /[01]/.test(trimmedText);
                const binaryChars = (trimmedText.match(/[01]/g) || []).length;
                const totalChars = trimmedText.replace(/\s/g, '').length;
                const binaryPercentage = totalChars > 0 ? binaryChars / totalChars : 0;
                const isBinary = binaryPattern.test(trimmedText) && hasBinaryChars && binaryPercentage >= 0.7;
                if (isBinary) {
                    notificationSystem.show('Texto binario detectado - decodificando', 'success');
                }
            }
        }
        
        // Ya no se guarda automáticamente en el historial
        statsSystem.update();
    };

    // Guardar en historial solo con el botón
    const saveToHistory = () => {
        const text = input.value;
        const result = output.value;
        if (!text.trim() || !result.trim()) {
            notificationSystem.show('No hay texto para guardar', 'error');
            return;
        }
        historySystem.add(text, result, currentAlgorithm);
        statsSystem.incrementConversions();
        notificationSystem.show('Conversión guardada en el historial');
    };

    // Funciones de utilidad
    const clear = () => {
        input.value = "";
        output.value = "";
        statsSystem.update();
        notificationSystem.show('Texto limpiado');
    };

    const copy = async () => {
        if (!output.value) {
            notificationSystem.show('No hay texto para copiar', 'error');
            return;
        }
        
        try {
            await navigator.clipboard.writeText(output.value);
            notificationSystem.show('Texto copiado al portapapeles');
        } catch (err) {
            // Fallback para navegadores antiguos
            output.select();
            document.execCommand("copy");
            notificationSystem.show('Texto copiado al portapapeles');
        }
    };

    const download = () => {
        const text = output.value;
        if (!text) {
            notificationSystem.show('No hay texto para descargar', 'error');
            return;
        }
        
        const filename = prompt("Escribe un nombre para el archivo") || "texto_transformado";
        const element = document.createElement('a');
        element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`);
        element.setAttribute('download', `${filename}.txt`);
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        
        notificationSystem.show('Archivo descargado');
    };

    const share = async () => {
        const text = output.value;
        if (!text) {
            notificationSystem.show('No hay texto para compartir', 'error');
            return;
        }
        
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Texto transformado',
                    text: text,
                    url: window.location.href
                });
                notificationSystem.show('Texto compartido');
            } catch (err) {
                notificationSystem.show('Error al compartir', 'error');
            }
        } else {
            // Fallback: copiar al portapapeles
            await copy();
        }
    };

    const openFile = (event) => {
        const file = event.target.files[0];
        if (!file) return;
        
        // Validación de archivo
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            notificationSystem.show('El archivo es demasiado grande (máximo 5MB)', 'error');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = (e) => {
            input.value = e.target.result;
            execute();
            notificationSystem.show(`Archivo "${file.name}" cargado`);
        };
        reader.onerror = () => {
            notificationSystem.show('Error al leer el archivo', 'error');
        };
        reader.readAsText(file);
    };

    // Drag & Drop
    const setupDragAndDrop = () => {
        const dropZones = [input, output, document.body];
        
        dropZones.forEach(zone => {
            zone.addEventListener('dragover', (e) => {
                e.preventDefault();
                zone.style.borderColor = 'var(--accent-primary)';
            });
            
            zone.addEventListener('dragleave', (e) => {
                e.preventDefault();
                zone.style.borderColor = '';
            });
            
            zone.addEventListener('drop', (e) => {
                e.preventDefault();
                zone.style.borderColor = '';
                
                const files = e.dataTransfer.files;
                if (files.length > 0) {
                    const file = files[0];
                    if (file.type.startsWith('text/') || file.name.match(/\.(txt|md|js|py|html|css|json)$/)) {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            input.value = e.target.result;
                            execute();
                            notificationSystem.show(`Archivo "${file.name}" cargado`);
                        };
                        reader.readAsText(file);
                    } else {
                        notificationSystem.show('Solo se permiten archivos de texto', 'error');
                    }
                }
            });
        });
    };

    // Atajos de teclado
    const setupKeyboardShortcuts = () => {
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch (e.key) {
                    case 'Enter':
                        e.preventDefault();
                        execute();
                        break;
                    case 'c':
                        if (document.activeElement === output) {
                            e.preventDefault();
                            copy();
                        }
                        break;
                    case 's':
                        e.preventDefault();
                        download();
                        break;
                    case 'k':
                        e.preventDefault();
                        clear();
                        break;
                }
            }
        });
    };

    // Inicialización
    const init = () => {
        themeSystem.init();
        modalSystem.init();
        setupDragAndDrop();
        setupKeyboardShortcuts();
        statsSystem.update();
        // Mostrar/ocultar control de César
        const showCaesar = () => {
            caesarControls.style.display = currentAlgorithm === 'shift' ? 'flex' : 'none';
        };
        showCaesar();
        // Configurar algoritmos en el modal
        const algorithmOptions = document.querySelectorAll('.algorithm-option');
        algorithmOptions.forEach(option => {
            option.addEventListener('click', () => {
                const algorithm = option.dataset.algorithm;
                currentAlgorithm = algorithm;
                algorithmSelector.innerHTML = `<i class="fas fa-code"></i><span>Algoritmo: ${algorithms[algorithm].name}</span>`;
                modalSystem.hide('algorithm-modal');
                showCaesar();
                execute();
                notificationSystem.show(`Algoritmo cambiado a: ${algorithms[algorithm].name}`);
            });
        });
        // Control de desplazamiento César
        caesarShiftInput.addEventListener('input', (e) => {
            caesarShift = Math.max(1, Math.min(25, parseInt(e.target.value)||3));
            if (currentAlgorithm === 'shift') execute();
        });
        // Botón borrar historial
        clearHistoryBtn.addEventListener('click', historySystem.clear);
        // Botones exportar historial
        exportJsonBtn.addEventListener('click', ()=>historySystem.export('json'));
        exportCsvBtn.addEventListener('click', ()=>historySystem.export('csv'));
        exportXmlBtn.addEventListener('click', ()=>historySystem.export('xml'));
        saveHistoryBtn.addEventListener("click", saveToHistory);
    };

    // Event listeners
    input.addEventListener("input", execute);
    copyButton.addEventListener("click", copy);
    clearButton.addEventListener("click", clear);
    downloadButton.addEventListener("click", download);
    shareButton.addEventListener("click", share);
    fileInput.addEventListener("change", openFile);
    themeToggle.addEventListener("click", themeSystem.toggle);
    algorithmSelector.addEventListener("click", () => modalSystem.show('algorithm-modal'));
    historyToggle.addEventListener("click", () => {
        historySystem.display();
        modalSystem.show('history-modal');
    });
    modalClose.addEventListener("click", () => modalSystem.hide('algorithm-modal'));
    historyModalClose.addEventListener("click", () => modalSystem.hide('history-modal'));

    // Inicializar la aplicación
    init();
});
