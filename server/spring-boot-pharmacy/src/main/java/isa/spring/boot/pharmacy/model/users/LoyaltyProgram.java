package isa.spring.boot.pharmacy.model.users;

import org.springframework.boot.context.properties.bind.DefaultValue;

import javax.persistence.*;

@Entity
@Table(name = "loyalty_program")
public class LoyaltyProgram {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id", unique=true, nullable=false)
    private Long id;

    @Column(name = "min_points")
    private int minPointsLimit;

    @Column(name = "max_points")
    private int maxPointsLimit;

    @Column(name = "silver_points")
    private int silverPointsBorder;

    @Column(name = "gold_points")
    private int goldPointsBorder;

    @Column(name = "silver_discount")
    private int silverCategoryDiscount;

    @Column(name = "gold_discount")
    private int goldCategoryDiscount;

    @Column(name = "examination_points")
    private int pointsPerExaminations;

    @Column(name = "counseling_points")
    private int pointsPerCounseling;

    public LoyaltyProgram() {
    }

    public LoyaltyProgram(Long id, int minPointsLimit, int maxPointsLimit, int silverPointsBorder, int goldPointsBorder,
                          int silverCategoryDiscount, int goldCategoryDiscount, int pointsPerExaminations, int pointsPerCounseling) {
        this.id = id;
        this.minPointsLimit = minPointsLimit;
        this.maxPointsLimit = maxPointsLimit;
        this.silverPointsBorder = silverPointsBorder;
        this.goldPointsBorder = goldPointsBorder;
        this.silverCategoryDiscount = silverCategoryDiscount;
        this.goldCategoryDiscount = goldCategoryDiscount;
        this.pointsPerExaminations = pointsPerExaminations;
        this.pointsPerCounseling = pointsPerCounseling;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getMinPointsLimit() {
        return minPointsLimit;
    }

    public void setMinPointsLimit(int minPointsLimit) {
        this.minPointsLimit = minPointsLimit;
    }

    public int getMaxPointsLimit() {
        return maxPointsLimit;
    }

    public void setMaxPointsLimit(int maxPointsLimit) {
        this.maxPointsLimit = maxPointsLimit;
    }

    public int getSilverPointsBorder() {
        return silverPointsBorder;
    }

    public void setSilverPointsBorder(int silverPointsBorder) {
        this.silverPointsBorder = silverPointsBorder;
    }

    public int getGoldPointsBorder() {
        return goldPointsBorder;
    }

    public void setGoldPointsBorder(int goldPointsBorder) {
        this.goldPointsBorder = goldPointsBorder;
    }

    public int getSilverCategoryDiscount() {
        return silverCategoryDiscount;
    }

    public void setSilverCategoryDiscount(int silverCategoryDiscount) {
        this.silverCategoryDiscount = silverCategoryDiscount;
    }

    public int getGoldCategoryDiscount() {
        return goldCategoryDiscount;
    }

    public void setGoldCategoryDiscount(int goldCategoryDiscount) {
        this.goldCategoryDiscount = goldCategoryDiscount;
    }

    public int getPointsPerExaminations() {
        return pointsPerExaminations;
    }

    public void setPointsPerExaminations(int pointsPerExaminations) {
        this.pointsPerExaminations = pointsPerExaminations;
    }

    public int getPointsPerCounseling() {
        return pointsPerCounseling;
    }

    public void setPointsPerCounseling(int pointsPerCounseling) {
        this.pointsPerCounseling = pointsPerCounseling;
    }
}
