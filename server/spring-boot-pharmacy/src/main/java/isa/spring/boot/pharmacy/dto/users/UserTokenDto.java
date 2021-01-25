package isa.spring.boot.pharmacy.dto.users;

public class UserTokenDto {

    private String accessToken;
    private Long expiresIn;

    public UserTokenDto() {
        this.accessToken = null;
        this.expiresIn = null;
    }

    public UserTokenDto(String accessToken, long expiresIn) {
        this.accessToken = accessToken;
        this.expiresIn = expiresIn;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public Long getExpiresIn() {
        return expiresIn;
    }

    public void setExpiresIn(Long expiresIn) {
        this.expiresIn = expiresIn;
    }
}
