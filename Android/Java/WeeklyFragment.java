package com.example.weatherapp;
import android.support.v4.app.Fragment; import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import android.support.annotation.Nullable;
import com.github.mikephil.charting.charts.LineChart;
import com.github.mikephil.charting.components.YAxis;
import com.github.mikephil.charting.data.Entry;
import com.github.mikephil.charting.data.LineDataSet;
import com.github.mikephil.charting.data.LineData;
import com.github.mikephil.charting.components.XAxis;
import com.github.mikephil.charting.components.Legend;
import com.github.mikephil.charting.components.AxisBase;
import com.github.mikephil.charting.formatter.ValueFormatter;
import com.github.mikephil.charting.components.YAxis;



import com.github.mikephil.charting.interfaces.datasets.ILineDataSet;
import android.graphics.Color;


import java.util.List;
import java.util.ArrayList;


public class WeeklyFragment extends Fragment {


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup viewGroup, Bundle savedInstanceState){
        View view = inflater.inflate(R.layout.weekly_layout, viewGroup, false);
        ImageView img = view.findViewById(R.id.image_card_view_wk);
        img.setImageResource(getArguments().getInt("wkic"));
        TextView txt = view.findViewById(R.id.txt_card_view_wk);
        txt.setText(getArguments().getString("wksm"));

        LineChart chart = (LineChart) view.findViewById(R.id.chart);

        int[] x = {0, 1, 2, 3, 4, 5, 6, 7};
        int[] y1 = getArguments().getIntArray("mins");
        int[] y2 = getArguments().getIntArray("maxs");

        ArrayList<Entry> entries1 = new ArrayList<Entry>();
        ArrayList<Entry> entries2 = new ArrayList<Entry>();


        for(int i = 0; i < 8; i++){
            entries1.add(new Entry(x[i], y1[i]));
            entries2.add(new Entry(x[i], y2[i]));

        }

        LineDataSet dataSet1 = new LineDataSet(entries1, "Minimum Temperature");
        LineDataSet dataSet2 = new LineDataSet(entries2, "Maximum Temperature");


        dataSet1.setColor(Color.rgb(0xC6, 0x7E, 0xFF));
        dataSet2.setColor(Color.rgb(0x83, 0x5A, 0x01));

        XAxis xAxis = chart.getXAxis();
        xAxis.setPosition(XAxis.XAxisPosition.TOP);
        xAxis.setTextColor(Color.rgb(255,255,255));
        xAxis.setGranularity(1);

        chart.getAxisLeft().setTextColor(Color.rgb(255,255,255));
        chart.getAxisRight().setTextColor(Color.rgb(255,255,255));
        chart.getAxisRight().setGranularity(10);
        chart.getAxisLeft().setGranularity(10);

        Legend legend = chart.getLegend();
        legend.setVerticalAlignment(Legend.LegendVerticalAlignment.BOTTOM);
        legend.setHorizontalAlignment(Legend.LegendHorizontalAlignment.CENTER);
        legend.setTextColor(Color.rgb(255,255,255));
        legend.setTextSize(15);
        legend.setFormSize(15);
        //legend.setDrawInside(false);

        LineData chartData = new LineData();
        chartData.addDataSet(dataSet1);
        chartData.addDataSet(dataSet2);
        chart.setData(chartData);
        chart.invalidate();


        return view;
    }

}