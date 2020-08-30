package br.com.tarefas.domain.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.tarefas.domain.model.Item;
import br.com.tarefas.infrastructure.exception.ItemException;
import br.com.tarefas.infrastructure.repository.ItemRepository;

@Service
public class ItemService {
	
	@Autowired
	private ItemRepository itemRepository;
	
	@Transactional
	public void salvar(Item item) {
		this.itemRepository.save(item);
	}
	
	@Transactional
	public Item buscarItemPorId(Integer id) throws Exception {
		Item item = this.itemRepository.findById(id)
							.orElseThrow(()-> new ItemException("Item não encontrado"));
		
		return item;
	}
}
