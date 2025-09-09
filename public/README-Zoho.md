# Modal CRM para Zoho

## Como usar no Zoho:

1. Baixe o arquivo `index.html`
2. Faça upload no Zoho ou copie o código HTML
3. O modal funciona de forma independente, sem dependências externas

## Funcionalidades:

- ✅ Pergunta inicial: "Cobrança ou salvar informações?"
- ✅ Botão "Cobrar": desabilita "Salvar" e mostra campo de valor
- ✅ Botão "Salvar": executa função personalizada (linha 338 do HTML)
- ✅ Campo valor com validação
- ✅ Botão "Finalizar" para processar cobrança
- ✅ Design responsivo e profissional

## Personalização:

### Para customizar a função de salvar:
Edite a linha 338 no arquivo HTML:
```javascript
handleSaveClick() {
    // SUA FUNÇÃO PERSONALIZADA AQUI
    console.log('Função de salvar chamada!');
    
    // Exemplo de integração com API
    // fetch('/api/save-card', { method: 'POST', ... })
}
```

### Para customizar a função de cobrança:
Edite a linha 350 no arquivo HTML:
```javascript
handleFinalize() {
    const amount = this.amountInput.value;
    // SUA FUNÇÃO DE COBRANÇA AQUI
    // fetch('/api/charge', { method: 'POST', body: JSON.stringify({amount}) })
}
```

## Arquivos incluídos:
- `index.html` - Arquivo principal standalone
- `README-Zoho.md` - Este arquivo de instruções