package isa.spring.boot.pharmacy.exceptions;

public class InvalidMedicineAmountException extends Exception{

    public InvalidMedicineAmountException(String cause) {
        super(cause);
    }
}
