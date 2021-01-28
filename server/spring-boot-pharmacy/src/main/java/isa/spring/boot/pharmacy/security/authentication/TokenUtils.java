package isa.spring.boot.pharmacy.security.authentication;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import isa.spring.boot.pharmacy.model.users.Authority;
import isa.spring.boot.pharmacy.model.users.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;

@Component
public class TokenUtils {

    @Value("spring-boot-pharmacy")
    private String APP_NAME;

    @Value("secret")
    public String SECRET;

    @Value("300000")
    private int EXPIRES_IN;

    @Value("Authorization")
    private String AUTH_HEADER;

    private SignatureAlgorithm SIGNATURE_ALGORITHM = SignatureAlgorithm.HS512;

    public String generateToken(Long userId, String email, String userRole) {
        return Jwts.builder()
                .setIssuer(APP_NAME)
                .setSubject(email)
                .setAudience("web")
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime() + EXPIRES_IN))
                .claim("userId", userId)
                .claim("userRole", userRole) //moguce je postavljanje proizvoljnih podataka u telo JWT tokena
                .signWith(SIGNATURE_ALGORITHM, SECRET).compact();
    }

    public String getAppName() {
        return APP_NAME;
    }

    public String getUsernameFromToken(String token) {
        String username;
        try {
            final Claims claims = this.getAllClaimsFromToken(token);
            username = claims.getSubject();
        } catch (Exception e) {
            username = null;
        }
        return username;
    }

    public Boolean validateToken(String token, UserDetails userDetails) {
        User user = (User) userDetails;
        final String username = getUsernameFromToken(token);
        final Date created = getIssuedAtDateFromToken(token);

        return (username != null && username.equals(userDetails.getUsername())
                && !isCreatedBeforeLastPasswordReset(created, user.getLastPasswordResetDate()));
    }

    public Date getIssuedAtDateFromToken(String token) {
        Date issueAt;
        try {
            final Claims claims = this.getAllClaimsFromToken(token);
            issueAt = claims.getIssuedAt();
        } catch (Exception e) {
            issueAt = null;
        }
        return issueAt;
    }

    private Boolean isCreatedBeforeLastPasswordReset(Date created, Date lastPasswordReset) {
        return (lastPasswordReset != null && created.before(lastPasswordReset));
    }

    public int getExpiresIn() {
        return EXPIRES_IN;
    }

    public String getToken(HttpServletRequest request) {
        String authHeader = getAuthHeaderFromHeader(request);

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            return authHeader.substring(7);
        }

        return null;
    }

    private Claims getAllClaimsFromToken(String token) {
        Claims claims;
        try {
            claims = Jwts.parser()
                    .setSigningKey(SECRET)
                    .parseClaimsJws(token)
                    .getBody();
        } catch (Exception e) {
            claims = null;
        }
        return claims;
    }

    public String getAuthHeaderFromHeader(HttpServletRequest request) {
        return request.getHeader(AUTH_HEADER);
    }
}
