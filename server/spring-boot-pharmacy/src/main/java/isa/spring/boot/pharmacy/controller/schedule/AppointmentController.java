package isa.spring.boot.pharmacy.controller.schedule;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value="api/appointment", produces = MediaType.APPLICATION_JSON_VALUE)
public class AppointmentController {
}
