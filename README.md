# ASTRA — Jornada Estelar ✦

Plataforma educativa independente de introdução à programação, robótica e resolução de problemas para meninas de 12 a 15 anos.

## Sobre

O ASTRA combina uma jornada de aprendizagem, missões, experimentos e conquistas com uma interface acolhedora em tons pastel. Este repositório começa pela migração do protótipo estático ASTRA v3 para uma estrutura organizada; trata-se de um **MVP em desenvolvimento**, não de uma plataforma com autenticação ou acompanhamento pedagógico remoto.

## Funcionalidades desta primeira versão

- Painel inicial, mapa da jornada, missões, laboratório, caderno de invenções e medalhas.
- Interações e progresso salvos localmente no navegador (`localStorage`).
- Opções iniciais de acessibilidade: tamanho de texto, contraste, redução de movimento e modo simplificado.
- Layout adaptável a telas menores.

## Como executar

Sem instalação ou bibliotecas: abra `index.html` no navegador.

Para um servidor local, na raiz do repositório:

```bash
python3 -m http.server 8000
```

Acesse `http://localhost:8000`.

## Organização

```text
ASTRA/
├── index.html
├── assets/
│   ├── css/styles.css
│   ├── js/app.js
│   └── images/
├── README.md
└── .gitignore
```

## Estado e privacidade

O progresso fica **somente no navegador usado**, sem conta, banco de dados ou sincronização entre dispositivos. O conteúdo de interação é experimental. Não inserir informações pessoais de crianças nos protótipos.

## Próximas etapas

1. Evoluir para os layouts aprovados de Jornada, Aprender, Desafios, Projetos, Conquistas, Comunidade e Meu Espaço.
2. Implementar trilhas de robótica, desafios em blocos e simulador 2D no navegador.
3. Adicionar testes de interface, acessibilidade e progressão pedagógica.
4. Projetar login e perfis com privacidade e segurança adequadas antes de armazenar dados de estudantes.

**Referência funcional:** [plataforma-estudos](https://github.com/jpavrdev/plataforma-estudos). O ASTRA mantém conteúdo, identidade e código próprios; não houve cópia de código desse repositório.

**Iniciativa independente:** ASTRA — ensino de robótica para meninas.


## ASTRA Lab
A seção **Circuitos e lógica** reúne dez atividades com desafios, materiais e links para o Tinkercad. As imagens SVG são conceituais; não devem ser usadas como referência de ligações elétricas. O GitHub Actions valida a sintaxe JavaScript e a presença de arquivos essenciais.
