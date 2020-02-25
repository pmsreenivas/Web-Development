package com.example.weatherapp;
import android.support.v4.app.Fragment; import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import android.widget.ImageView;
import com.example.weatherapp.MainActivity;



public class TodayFragment extends Fragment {


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup viewGroup, Bundle savedInstanceState){
        View view = inflater.inflate(R.layout.today_layout, viewGroup, false);
        String argg[] = getArguments().getStringArray("array");
        TextView txv = view.findViewById(R.id.card00_val);
        txv.setText(argg[0]);
        txv = view.findViewById(R.id.card01_val);
        txv.setText(argg[1]);
        txv = view.findViewById(R.id.card02_val);
        txv.setText(argg[2]);
        txv = view.findViewById(R.id.card10_val);
        txv.setText(argg[3]);
        txv = view.findViewById(R.id.card12_val);
        txv.setText(argg[5]);
        txv = view.findViewById(R.id.card20_val);
        txv.setText(argg[6]);
        txv = view.findViewById(R.id.card21_val);
        txv.setText(argg[7]);
        txv = view.findViewById(R.id.card22_val);
        txv.setText(argg[8]);

        int mci = MainActivity.getIcon(argg[4]);

        ImageView mcim = view.findViewById(R.id.image_card_view11);
        mcim.setImageResource(mci);

        String mcit;

        switch (argg[4]){
            case "clear-day":
                mcit = "clear day";
                break;
            case  "clear-night":
                mcit = "clear night";
                break;
            case  "rain":
                mcit = "rain";
                break;
            case  "sleet":
                mcit = "sleet";
                break;
            case  "snow":
                mcit = "snow";
                break;
            case  "wind":
                mcit = "wind";
                break;
            case  "fog":
                mcit = "fog";
                break;
            case  "cloudy":
                mcit = "cloudy";
                break;
            case  "partly-cloudy-night":
                mcit = "cloudy day";
                break;
            case  "partly-cloudy-day":
                mcit = "cloudy night";
                break;
            default:
                mcit = "clear day";
        }

        txv = view.findViewById(R.id.card11_txt);
        txv.setText(mcit);

        return view;
    }

}