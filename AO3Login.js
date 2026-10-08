import React from 'react';
import { WebView } from 'react-native-webview';

export default function AO3Login({ onLoginSuccess }) {
    const injectCookieScraper = `
    //This script runs on the AO3 webpage inside the app
    window.ReactNativeWebView.postMessage(document.cookie);
    true;
    `;

    const handleMessage = (event) => {
        
}