document.addEventListener('DOMContentLoaded', () => {
    // Referência aos elementos HTML
    const userNameSpan = document.getElementById('user-name');
    const userContactSpan = document.getElementById('user-contact');
    const pontuacaoUsuarioSpan = document.getElementById('pontuacao-usuario');
    const pontuacaoTotalSpan = document.getElementById('pontuacao-total');
    const condicoesListUl = document.getElementById('condicoes-lista-perfil');
    
    // Tenta carregar os dados do usuário e da última avaliação do localStorage
    const dadosUsuario = JSON.parse(localStorage.getItem('dadosUsuario'));
    const ultimaAvaliacao = JSON.parse(localStorage.getItem('ultimaAvaliacao'));

    // Verifica se há dados da avaliação para exibir
    if (dadosUsuario || ultimaAvaliacao) {
        try {
            // === Exibe as informações pessoais ===
            if (userNameSpan) {
                userNameSpan.textContent = dadosUsuario.nome || 'Não informado';
            }
            if (userContactSpan) {
                // Exibir o contato (e-mail ou telefone)
                userContactSpan.textContent = dadosUsuario.contato || 'Não informado';
            }
            
            // === Exibe a pontuação e condições da avaliação ===
            if (ultimaAvaliacao) {
                if (pontuacaoUsuarioSpan) {
                    pontuacaoUsuarioSpan.textContent = ultimaAvaliacao.pontuacao || 'N/A';
                }
                if (pontuacaoTotalSpan) {
                    pontuacaoTotalSpan.textContent = '22';
                }
                
                if (condicoesListUl && ultimaAvaliacao.grupo) {
                    condicoesListUl.innerHTML = '';
                    
                    // Exibe o grupo de saúde
                    const grupoLi = document.createElement('li');
                    grupoLi.textContent = `Grupo de Saúde: ${ultimaAvaliacao.grupo}`;
                    condicoesListUl.appendChild(grupoLi);
                    
                    // Exibe as alergias e restrições
                    if (ultimaAvaliacao.alergias && ultimaAvaliacao.alergias.length > 0) {
                        ultimaAvaliacao.alergias.forEach(alergia => {
                            const li = document.createElement('li');
                            li.textContent = `Alergia a ${alergia}`;
                            condicoesListUl.appendChild(li);
                        });
                    }
                    
                    if (ultimaAvaliacao.restricoes && ultimaAvaliacao.restricoes.length > 0) {
                        ultimaAvaliacao.restricoes.forEach(restricao => {
                            const li = document.createElement('li');
                            li.textContent = `Restrição: ${restricao}`;
                            condicoesListUl.appendChild(li);
                        });
                    }
                }
            }

        } catch (e) {
            console.error('Erro ao processar dados do localStorage:', e);
            if (userNameSpan) userNameSpan.textContent = 'Erro ao carregar';
            if (userContactSpan) userContactSpan.textContent = 'Erro ao carregar';
            if (pontuacaoUsuarioSpan) pontuacaoUsuarioSpan.textContent = 'Erro';
            if (condicoesListUl) condicoesListUl.innerHTML = '<li>Erro ao carregar dados.</li>';
        }
    } else {
        // Mensagens padrão caso não haja dados no localStorage
        if (userNameSpan) userNameSpan.textContent = 'Nenhum dado encontrado.';
        if (userContactSpan) userContactSpan.textContent = 'Nenhum dado encontrado.';
        if (pontuacaoUsuarioSpan) pontuacaoUsuarioSpan.textContent = '0';
        if (pontuacaoTotalSpan) pontuacaoTotalSpan.textContent = '22';
        if (condicoesListUl) condicoesListUl.innerHTML = '<li>Sem dados de avaliação.</li>';
    }
});