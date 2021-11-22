package com.myavvocatoapp;
import android.os.Bundle;
import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen; // here 
public class MainActivity extends ReactActivity {
  @Override
  protected String getMainComponentName() {
    return "MyAvvocatoApp";
  }
    @Override
    protected void onCreate(Bundle savedInstanceState) {
//        SplashScreen.show(this);  // here
        SplashScreen.show(this, R.style.SplashTheme);
        super.onCreate(savedInstanceState);
    }
}
