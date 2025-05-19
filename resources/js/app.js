import './bootstrap';
// resources/js/app.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import ExampleComponent from './components/ExampleComponent';

if (document.getElementById('app')) {
    const root = createRoot(document.getElementById('app'));
    root.render(<ExampleComponent />);
}