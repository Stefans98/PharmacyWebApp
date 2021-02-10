package isa.spring.boot.pharmacy.service.qrcode;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.util.JSONPObject;
import com.google.zxing.*;
import com.google.zxing.client.j2se.BufferedImageLuminanceSource;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.common.HybridBinarizer;
import com.google.zxing.qrcode.QRCodeWriter;
import isa.spring.boot.pharmacy.dto.medicines.EPrescriptionItemDto;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
public class QRCodeService {

    public void generateQRCode(List<EPrescriptionItemDto> medicines) throws IOException, WriterException {
        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        ObjectMapper mapper = new ObjectMapper();
        String medicineConverted = mapper.writeValueAsString(medicines);
        BitMatrix bitMatrix = qrCodeWriter.encode(medicineConverted, BarcodeFormat.QR_CODE, 400, 400);

        MatrixToImageWriter.writeToPath(bitMatrix, "PNG", Paths.get("./src/main/resources/QRCode.png"));
    }

    public List<EPrescriptionItemDto> decodeQRCode(MultipartFile code) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        InputStream is = new ByteArrayInputStream(code.getBytes());
        BufferedImage bufferedImage = ImageIO.read(is);
        String encodedContent = null;
        List<EPrescriptionItemDto> medicines = null;
        try {
            BufferedImageLuminanceSource bufferedImageLuminanceSource = new BufferedImageLuminanceSource(bufferedImage);
            HybridBinarizer hybridBinarizer = new HybridBinarizer(bufferedImageLuminanceSource);
            BinaryBitmap binaryBitmap = new BinaryBitmap(hybridBinarizer);
            MultiFormatReader multiFormatReader = new MultiFormatReader();

            Result result = multiFormatReader.decode(binaryBitmap);
            encodedContent = result.getText();
            medicines = mapper.readValue(encodedContent, new TypeReference<List<EPrescriptionItemDto>>(){});
        } catch (NotFoundException e) {
            e.printStackTrace();
        }
        return medicines;
    }
}
