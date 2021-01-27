package isa.spring.boot.pharmacy.service.users;

import isa.spring.boot.pharmacy.model.users.Authority;
import isa.spring.boot.pharmacy.repository.users.AuthorityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AuthorityService {

    @Autowired
    private AuthorityRepository authorityRepository;

    public List<Authority> findById(Long id)
    {
        Authority authority = authorityRepository.getOne(id);
        List<Authority> authorities = new ArrayList<>();
        authorities.add(authority);
        return authorities;
    }

    public List<Authority> findByName(String name)
    {
        Authority authority = authorityRepository.findByName(name);
        List<Authority> authorities = new ArrayList<>();
        authorities.add(authority);
        return authorities;
    }
}
