package br.com.tarefas.infrastructure.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.tarefas.domain.model.Tarefa;

@Repository
public interface TarefaRepository extends JpaRepository<Tarefa, Integer> {

}
