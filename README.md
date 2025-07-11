# 🔐 Random Generator

Una aplicación web moderna y elegante para la codificación y transformación de texto con múltiples algoritmos de cifrado.

![Random Generator](https://img.shields.io/badge/Status-Activo-brightgreen)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow)
![CSS](https://img.shields.io/badge/CSS3-Modern-blue)
![HTML](https://img.shields.io/badge/HTML5-Semantic-orange)

## ✨ Características

### 🎨 **Interfaz Moderna**
- Diseño responsive con glassmorphism
- Modo claro/oscuro automático
- Animaciones suaves y transiciones elegantes
- Interfaz intuitiva y fácil de usar

### 🔧 **Algoritmos de Codificación**
- **Básico**: Conversión de caracteres a símbolos especiales de mi propio diseño
- **Reverso**: Inversión completa del texto
- **César**: Cifrado por desplazamiento (1-25 posiciones)
- **Binario**: Conversión a representación binaria
- **Morse**: Código Morse bidireccional

### 📊 **Funcionalidades Avanzadas**
- **Estadísticas en tiempo real**: Contador de caracteres, palabras y conversiones
- **Análisis de frecuencia**: Visualización de caracteres más comunes
- **Historial completo**: Guardado y gestión de conversiones previas
- **Exportación múltiple**: JSON, CSV y XML
- **Drag & Drop**: Arrastra archivos directamente a la aplicación

### 💾 **Gestión de Archivos**
- Carga de archivos de texto (.txt, .md, .js, .py, .html, .css, .json)
- Descarga de resultados con nombre personalizado
- Compartir texto transformado
- Copiar al portapapeles con un clic

### ⌨️ **Atajos de Teclado**
- `Ctrl/Cmd + Enter`: Ejecutar transformación
- `Ctrl/Cmd + C`: Copiar resultado
- `Ctrl/Cmd + S`: Descargar archivo
- `Ctrl/Cmd + K`: Limpiar texto
- `Escape`: Cerrar modales

## 🚀 Instalación y Uso

### El proyecto está disponible con GitHub Pages en este enlace:
https://shmueldmontoya.github.io/randomgeneratorv2/


## 📖 Guía de Uso

### Transformación Básica
1. Selecciona un algoritmo en el botón "Algoritmo"
2. Escribe o pega tu texto en el área de entrada
3. El resultado aparecerá automáticamente en el área de salida
4. Usa los botones para copiar, descargar o compartir

### Algoritmos Disponibles

#### 🔤 Básico
Convierte caracteres a símbolos especiales:
```
Hola mundo → ©²®¢ &°¥®¥²
```

#### 🔄 Reverso
Invierte el texto completo:
```
Hola mundo → odnum aloH
```

#### 🔢 César
Desplaza caracteres por posiciones (configurable):
```
Hola mundo (desplazamiento 3) → Krod pxqgr
```

#### 🔟 Binario
Convierte a representación binaria:
```
Hola → 01001000 01101111 01101100 01100001
```

#### 📡 Morse
Convierte a código Morse:
```
HOLA → .... --- .-.. .-
```

### Gestión del Historial
- **Guardar**: Usa el botón "Guardar en historial" para almacenar conversiones
- **Ver**: Accede al historial completo con el botón "Historial"
- **Exportar**: Descarga el historial en JSON, CSV o XML
- **Limpiar**: Borra todo el historial con el botón correspondiente

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica y accesible
- **CSS3**: 
  - Variables CSS para temas
  - Flexbox y Grid para layouts
  - Animaciones y transiciones
  - Glassmorphism y efectos modernos
- **JavaScript ES6+**:
  - Módulos y funciones modernas
  - LocalStorage para persistencia
  - APIs del navegador (Clipboard, File, Drag & Drop)
  - Event handling avanzado

## 🎨 Características de Diseño

### Temas
- **Modo Claro**: Colores suaves y profesionales
- **Modo Oscuro**: Tema oscuro para uso nocturno
- Transición automática entre temas

### Responsive Design
- Adaptable a móviles, tablets y desktop
- Grid layouts flexibles
- Controles optimizados para touch

### Accesibilidad
- Navegación por teclado
- Etiquetas ARIA apropiadas
- Contraste de colores optimizado
- Textos alternativos en iconos

## 📁 Estructura del Proyecto

```
random-generator/
├── index.html          # Página principal
├── css/
│   └── main.css        # Estilos principales
├── js/
│   └── app.js          # Lógica de la aplicación
├── favicon.png         # Icono del sitio
└── README.md           # Este archivo
```

## 🔧 Personalización

### Agregar Nuevos Algoritmos
Para clonar el repositorio o descargarlo y agregar un nuevo algoritmo, edita el objeto `algorithms` en `app.js`:

```javascript
tuAlgoritmo: {
    name: 'Tu Algoritmo',
    description: 'Descripción del algoritmo',
    transform: (text) => {
        // Lógica de transformación
        return textoTransformado;
    },
    reverse: (text) => {
        // Lógica de reversión (opcional)
        return textoOriginal;
    }
}
```

### Modificar Estilos
Los estilos están organizados en variables CSS en `main.css`:
- `--bg-primary`: Color de fondo principal
- `--accent-primary`: Color de acento
- `--text-primary`: Color de texto principal

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para contribuir:

1. Haz un fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🙏 Agradecimientos

- [Font Awesome](https://fontawesome.com/) por los iconos
- [Google Fonts](https://fonts.google.com/) por las tipografías
- [Inter](https://rsms.me/inter/) y [JetBrains Mono](https://www.jetbrains.com/lp/mono/) por las fuentes

## 📞 Contacto

- **Autor**: [Samuel Antonio Delgado]
- **Email**: samueladm23@outlook.com
- **GitHub**: [@shmueldmontoya](https://github.com/shmueldmontoya)

---

⭐ Si este proyecto te ha sido útil, ¡no olvides darle una estrella en GitHub! 
