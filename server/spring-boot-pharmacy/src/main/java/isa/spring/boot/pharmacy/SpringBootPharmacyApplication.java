package isa.spring.boot.pharmacy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class SpringBootPharmacyApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringBootPharmacyApplication.class, args);
	}

}
