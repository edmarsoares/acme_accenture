package br.com.tarefas.application;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.tarefas.domain.model.Item;
import br.com.tarefas.domain.model.Tarefa;
import br.com.tarefas.domain.service.TarefaService;

@RestController
@RequestMapping("api/tarefa")
@CrossOrigin("*")
public class TarefaController {
	
	@Autowired
	private TarefaService tarefaService;
	
	@PostMapping
	public ResponseEntity<?> criarTarefa(@RequestBody Tarefa tarefa){
		this.tarefaService.criarTarefa(tarefa);
		return ResponseEntity.ok().build();
	}
	
	@PutMapping("/item/{idTarefa}")
	public ResponseEntity<?> adicionarItem(@PathVariable Integer idTarefa, @RequestBody Item item){
		this.tarefaService.adicionarItem(item, idTarefa);
		return ResponseEntity.ok().build();
	}
	
	@GetMapping("/itensConcluidos/{idItems}")
	public ResponseEntity<?> itemConcluido(@PathVariable List<Integer> idItems) throws Exception{
		this.tarefaService.marcarItemComoConcluido(idItems);
		return ResponseEntity.ok().build();
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Tarefa> buscarPorID(@PathVariable Integer id) throws Exception{
		Optional<Tarefa> tarefa = this.tarefaService.buscarTarefaPorId(id);
		return ResponseEntity.ok(tarefa.get());
	}
	
	@DeleteMapping("/item/{idItem}/tarefa/{idTarefa}")
	public ResponseEntity<?> removerItem(@PathVariable Integer idItem, @PathVariable Integer idTarefa) throws Exception{
		this.tarefaService.removerItem(idItem, idTarefa);
		return ResponseEntity.ok().build();
	}
	
	@GetMapping()
	public ResponseEntity<?> listarTarefa(){
		List<Tarefa> tarefas = this.tarefaService.listar();
		
		return ResponseEntity.ok(tarefas);
	}

}
