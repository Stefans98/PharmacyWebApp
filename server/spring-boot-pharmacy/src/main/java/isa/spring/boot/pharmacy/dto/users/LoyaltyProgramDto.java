package isa.spring.boot.pharmacy.dto.users;

public class LoyaltyProgramDto {

    private int silverPointsBorder;
    private int goldPointsBorder;
    private int silverCategoryDiscount;
    private int goldCategoryDiscount;
    private int pointsPerExaminations;
    private int pointsPerCounseling;

    public LoyaltyProgramDto() {
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
