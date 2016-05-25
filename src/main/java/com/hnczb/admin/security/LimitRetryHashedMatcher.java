package com.hnczb.admin.security;

import org.apache.commons.codec.binary.Base64;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authc.credential.HashedCredentialsMatcher;
import org.spongycastle.crypto.PBEParametersGenerator;
import org.spongycastle.crypto.digests.SHA256Digest;
import org.spongycastle.crypto.generators.PKCS5S2ParametersGenerator;
import org.spongycastle.crypto.params.KeyParameter;

import java.nio.charset.Charset;

/**
 * 重写密码验证
 * Created by liutao on 15/8/30.
 */
public class LimitRetryHashedMatcher extends HashedCredentialsMatcher {
    public final Integer DEFAULT_ITERATIONS = 10000;
    public final String algorithm = "pbkdf2_sha256";
    @Override
    public boolean doCredentialsMatch(AuthenticationToken token, AuthenticationInfo info) {
        UsernamePasswordToken authenToken = (UsernamePasswordToken) token;

        //返回用户信息
        Object infoOb=info.getCredentials();

        String salt=authenToken.getUsername().toLowerCase()+"huaneng";
//        System.out.print(salt);

        String passWord=String.valueOf(authenToken.getPassword());
//        System.out.println(passWord);

        String tokenOb=encode(passWord,salt);
//        System.out.println(tokenOb);
//        System.out.println(infoOb);

        if(infoOb!=null){
            if(infoOb.equals(tokenOb)){
                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }



//        String username = (String) token.getPrincipal();
////retrycount + 1
//        Object element = EhcacheUtil.getItem(username);
//        if (element == null) {
//            EhcacheUtil.putItem(username, 1);
//            element=0;
//        }else{
//            int count=Integer.parseInt(element.toString())+1;
//            element=count;
//            EhcacheUtil.putItem(username,element);
//        }
//        AtomicInteger retryCount = new AtomicInteger(Integer.parseInt(element.toString()));
//        if (retryCount.incrementAndGet() > 5) {
////if retrycount >5 throw
//            throw new ExcessiveAttemptsException();
//        }
//        boolean matches = super.doCredentialsMatch(token, info);
//        if (matches) {
////clear retrycount
//            EhcacheUtil.removeItem(username);
//        }
//        return matches;
    }
    public String getEncodedHash(String password, String salt, int iterations) {
        PKCS5S2ParametersGenerator generator = new PKCS5S2ParametersGenerator(new SHA256Digest());
        generator.init(PBEParametersGenerator.PKCS5PasswordToUTF8Bytes(password.toCharArray()), salt.getBytes(Charset.forName("UTF-8")), iterations);
        KeyParameter key = (KeyParameter)generator.generateDerivedMacParameters(256);
        byte[] rawHash = key.getKey();
        byte[] hashBase64 = Base64.encodeBase64(rawHash);
        return new String(hashBase64);
    }

    public String encode(String password, String salt, int iterations) {
        String hash = getEncodedHash(password, salt, iterations);
        return String.format("%s$%d$%s$%s", algorithm, iterations, salt, hash);
    }

    public String encode(String password, String salt) {
        return this.encode(password, salt, this.DEFAULT_ITERATIONS);
    }
}
