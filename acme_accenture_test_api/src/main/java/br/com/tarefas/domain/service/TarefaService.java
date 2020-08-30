package br.com.tarefas.domain.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.tarefas.domain.model.Item;
import br.com.tarefas.domain.model.Tarefa;
import br.com.tarefas.infrastructure.repository.TarefaRepository;

@Service
public class TarefaService {
	
	@Autowired
	private TarefaRepository tarefaRepository;
	@Autowired
	private ItemService itemService;
	
	@Transactional
	public void criarTarefa(Tarefa tarefa) {
		this.tarefaRepository.save(tarefa);
	}
	
	@Transactional
	public void adicionarItem(Item item, Integer idTarefa) {
		Optional<Tarefa> tarefa = this.buscarTarefaPorId(idTarefa);
		
		if (tarefa.isPresent()) {
			tarefa.get().adicionarItens(item);
		}
		this.tarefaRepository.save(tarefa.get());
	}
	@Transactional
	public void removerItem(Integer idItem, Integer idTarefa) throws Exception {
		Optional<Tarefa> tarefa = this.buscarTarefaPorId(idTarefa);
		Item item = this.itemService.buscarItemPorId(idItem);
		
		if (tarefa.isPresent()) {
			tarefa.get().removerItem(item);
		}
		this.tarefaRepository.save(tarefa.get());
	}
	
	@Transactional
	public Optional<Tarefa> buscarTarefaPorId(Integer id) {
		return this.tarefaRepository.findById(id);
	}
	
	@Transactional
	public List<Tarefa> listar(){
		return this.tarefaRepository.findAll();
	}
	
	@Transactional
	public void marcarItemComoConcluido(List<Integer> idItens)  {
		
		idItens.stream().forEach(idItem -> {
			Item itemEncontrato;
			try {
				itemEncontrato = this.itemService.buscarItemPorId(idItem);

				itemEncontrato.setItemConcluido(true);
				itemService.salvar(itemEncontrato);
			} catch (Exception e) {
				e.printStackTrace();
			}
		});
		
	}
}
