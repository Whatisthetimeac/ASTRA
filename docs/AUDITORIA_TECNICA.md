# Auditoria técnica das 10 missões — 01/11/2026

## Escopo e limites
- **Validável automaticamente:** estrutura do site, existência das dez aulas, imagens SVG de fallback, ligação do menu, sintaxe JavaScript, aviso de natureza ilustrativa e link externo para o Tinkercad.
- **Não validado:** fotos reais, fidelidade de prints de Tinkercad, correspondência dos fios das imagens geradas com circuitos reais, resultados de simulação e teste físico. As imagens WebP disponíveis em pacote externo são **artes geradas digitalmente** e mostram interfaces estilizadas, não evidências de simulação.
- **Publicação:** a configuração de GitHub Pages foi adicionada, mas a implantação só pode ser considerada concluída após o workflow de deploy terminar com sucesso e a URL responder.

## Checagem de componentes
| Missão | Checagem conceitual | Pendência para selo “testado” |
|---|---|---|
| LED + resistor | 5 V, LED vermelho aprox. 2 V, 330 Ω implica ~9,1 mA (modelo ideal); resistor em série | Verificar tensão real, polaridade e corrente |
| Botão + LED | Botão normalmente aberto interrompe circuito em série | Confirmar orientação dos quatro terminais |
| Semáforo | Três resistores individuais e saídas digitais independentes | Verificar código, tempos e pinos |
| Buzzer | Ativo e passivo exigem estratégias distintas | Confirmar datasheet, corrente e tensão |
| LDR | Leitura de divisor resistivo no A0 | Validar orientação do divisor e limiar |
| HC-SR04 | Trigger e Echo distintos; tempo de voo dividido por dois | Verificar conexões, tempo e alcance |
| Servo + potenciômetro | Cursor no A0 e sinal do servo em pino de controle | Verificar corrente da fonte e terra comum |
| LCD 16x2 | Pinagem depende do módulo e do uso de interface I2C ou paralela | Escolher modelo exato e biblioteca |
| DHT11 | Pinagem do sensor solto difere da de certos módulos | Confirmar pinout e pull-up |
| Portas lógicas | AND, OR e NOT têm tabelas-verdade definidas | Testar exercício e acessibilidade |

## Critério de liberação das montagens
1. Escolher part numbers reais e datasheets oficiais.
2. Construir projeto específico no Tinkercad, com link público ou compartilhável verificável.
3. Rodar simulação, salvar capturas reais e registrar resultados.
4. Testar em bancada sob supervisão, se for instrução para montagem física.
5. Somente então marcar a atividade como “validada”.

**Status atual:** conteúdo introdutório publicável com aviso; montagens **não certificadas como testadas**.
