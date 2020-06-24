package com.example.diplom.service;

import com.example.diplom.model.Phase;
import com.example.diplom.repository.PhaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PhaseService {

    @Autowired
    private PhaseRepository phaseRepository;

    public List<Phase> getAll() {
        return phaseRepository.findAll();
    }

    public Phase create (String title) {
        return phaseRepository.save(new Phase(title));
    }

}
