package isa.spring.boot.pharmacy.service.medicines;

import isa.spring.boot.pharmacy.model.medicines.MedicineOrderList;
import isa.spring.boot.pharmacy.model.medicines.OrderItem;
import isa.spring.boot.pharmacy.repository.medicines.MedicineOrderListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicineOrderListService {

    @Autowired
    private MedicineOrderListRepository medicineOrderListRepository;

    @Autowired
    private OrderItemService orderItemService;

    public MedicineOrderList createMedicineOrderList(MedicineOrderList medicineOrderList){
        return medicineOrderListRepository.save(medicineOrderList);
    }

    public List<MedicineOrderList> getAll() {
        return medicineOrderListRepository.findAll();
    }
}
