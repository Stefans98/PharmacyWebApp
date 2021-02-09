package isa.spring.boot.pharmacy.service.medicines;

import isa.spring.boot.pharmacy.model.medicines.MedicineOrderList;
import isa.spring.boot.pharmacy.model.medicines.OrderItem;
import isa.spring.boot.pharmacy.repository.medicines.MedicineOrderListRepository;
import org.hibernate.criterion.Order;
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
        medicineOrderList.setDeleted(false);
        return medicineOrderListRepository.save(medicineOrderList);
    }

    public List<MedicineOrderList> getAll() {
        List<MedicineOrderList> medicineOrderLists = new ArrayList<>();
        for(MedicineOrderList medicineOrderList : medicineOrderListRepository.findAll()){
            if(!medicineOrderList.getDeleted()){
                medicineOrderLists.add(medicineOrderList);
            }
        }
        return medicineOrderLists;
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

    public List<MedicineOrderList> findMedicineOrderListsForPharmacy(Long pharmacyId){
        List<MedicineOrderList> medicineOrderListsForPharmacy = new ArrayList<>();
        for(MedicineOrderList medicineOrderList : getAll()){
            if(medicineOrderList.getPharmacy().getId() == pharmacyId){
                medicineOrderListsForPharmacy.add(medicineOrderList);
            }
        }
        return medicineOrderListsForPharmacy;
    }

    public MedicineOrderList updateMedicineOrderList(MedicineOrderList newMedicineOrderList){
        MedicineOrderList oldMedicineOrderList = findOldMedicineOrderList(newMedicineOrderList.getId());
        if(oldMedicineOrderList.getOffers().isEmpty()){
            newMedicineOrderList.setDeleted(false);
            return medicineOrderListRepository.save(newMedicineOrderList);
        }else{
            return null;
        }
    }

    public boolean deleteMedicineOrderList(MedicineOrderList medicineOrderList){
        MedicineOrderList tempMedicineOrderList = findOldMedicineOrderList(medicineOrderList.getId());
        if(tempMedicineOrderList.getOffers().isEmpty()){
            tempMedicineOrderList.setDeleted(true);
            medicineOrderListRepository.save(tempMedicineOrderList);
            return true;
        }else{
            return false;
        }
    }

    public MedicineOrderList findOldMedicineOrderList(Long id){
        for(MedicineOrderList medicineOrderList : getAll()){
            if(medicineOrderList.getId() == id){
                return medicineOrderList;
            }
        }
        return null;
    }
}
