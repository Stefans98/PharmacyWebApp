package isa.spring.boot.pharmacy.service.medicines;

import isa.spring.boot.pharmacy.model.medicines.MedicineOrderList;
import isa.spring.boot.pharmacy.model.medicines.OrderItem;
import isa.spring.boot.pharmacy.repository.medicines.MedicineOrderListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
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

    public List<MedicineOrderList> getAllActive() {
        List<MedicineOrderList> medicineOrderLists = getAll();
        List<MedicineOrderList> activeMedicineOrderLists = new ArrayList<>();
        Date currentDate = new Date();
        for (MedicineOrderList medicineOrderList : medicineOrderLists) {
            if (medicineOrderList.getFinalOfferDate().after(currentDate)) {
                activeMedicineOrderLists.add(medicineOrderList);
            }
        }
        return activeMedicineOrderLists;
    }

    public MedicineOrderList findById(Long id) { return  medicineOrderListRepository.getOne(id); }
}
