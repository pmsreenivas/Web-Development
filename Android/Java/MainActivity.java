package com.example.weatherapp;

import android.content.Context;
import android.net.Uri;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.JsonArrayRequest;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import android.util.Log;
import java.util.Date;
import java.util.Calendar;
import java.text.SimpleDateFormat;
import java.util.Locale;
import java.util.TimeZone;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.support.v7.widget.SearchView;
import android.support.v4.view.MenuItemCompat;
import android.app.SearchManager;
import android.widget.SearchView.OnQueryTextListener;
import android.widget.ArrayAdapter;
import java.util.ArrayList;
import android.widget.AutoCompleteTextView;
import android.view.View;
import android.widget.SearchView.OnSuggestionListener;
import android.database.Cursor;
import android.widget.AdapterView;
import android.text.TextWatcher;
import android.os.Handler;
import android.os.Message;
import android.text.Editable;
import android.text.TextUtils;
import android.widget.ProgressBar;
import android.support.v7.widget.CardView;
import android.content.Intent;


public class MainActivity extends AppCompatActivity {
    private Handler handler;
    private static final int TRIGGER_AUTO_COMPLETE = 100;
    private static final long AUTO_COMPLETE_DELAY = 300;
    String IP_city, IP_region, IP_regionName, IP_lat, IP_lon;
    String LL_icon;
    JSONObject jo;
    JSONArray ja;
    JsonObjectRequest jsonObjectRequest, jsonObjectRequest2, jsonObjectRequest3;
    Context context;
    RequestQueue requestQueue;
    final String LL_url = "http://csci571pms2-nodejs.us-west-1.elasticbeanstalk.com/darksky?lat=";
    final String Auto_url = "http://csci571pms2-nodejs.us-west-1.elasticbeanstalk.com/auto?str=";
    final String Loc_url = "http://csci571pms3-nodejs.us-west-1.elasticbeanstalk.com/formvals?address=";
    ArrayList<String> list;
    ArrayAdapter<String > adapter;
    final String IP_url = "http://ip-api.com/json";
    private ProgressBar spinner;
    private CardView card1, card2, card3;
    private TextView scht, fw;
    String PlaceText, C00, C01, C02, C10, C11, C12, C20, C21, C22, CWK_sum;
    int C11_icon, CWK_icon;
    int [] mins = new int[8];
    int [] maxs = new int[8];




    @Override
    protected void onCreate(Bundle savedInstanceState) {



        list = new ArrayList<>();

        adapter = new ArrayAdapter<String>(this, android.R.layout.simple_dropdown_item_1line, list);

        context = getApplicationContext();
        setTheme(R.style.AppTheme);
        try
        {
            Thread.sleep(2 * 1000);
        }
        catch(InterruptedException ex)
        {
            Thread.currentThread().interrupt();
        }
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_main);


        spinner=(ProgressBar)findViewById(R.id.progressBar1);
        card1 = findViewById(R.id.card_view1);
        card2 = findViewById(R.id.card_view2);
        card3 = findViewById(R.id.card_view3);
        scht = findViewById(R.id.search_indicator);
        fw = findViewById(R.id.fetch);

        spinner.setVisibility(View.VISIBLE);
        card1.setVisibility(View.GONE);
        card2.setVisibility(View.GONE);
        card3.setVisibility(View.GONE);
        scht.setVisibility(View.GONE);
        fw.setVisibility(View.VISIBLE);



        requestQueue = Volley.newRequestQueue(context);

       // Toast.makeText(getApplicationContext(), "descriptionA",Toast.LENGTH_LONG).show();


        displayWeather(IP_url, "dummy");

       // Toast.makeText(getApplicationContext(), "descriptionB",Toast.LENGTH_LONG).show();




    }

    public static int getIcon(String icon){
        switch (icon){
            case "clear-day":
                return R.mipmap.card1_clear_day;
            case  "clear-night":
                return R.mipmap.card1_clear_night;
            case  "rain":
                return R.mipmap.card1_rain;
            case  "sleet":
                return R.mipmap.card1_sleet;
            case  "snow":
                return R.mipmap.card1_snow;
            case  "wind":
                return R.mipmap.card1_wind;
            case  "fog":
                return R.mipmap.card1_fog;
            case  "cloudy":
                return R.mipmap.card1_cloudy;
            case  "partly-cloudy-night":
                return R.mipmap.card1_partly_cloudy_night;
            case  "partly-cloudy-day":
                return R.mipmap.card1_partly_cloudy_day;
            default:
                return R.mipmap.card1_clear_day;
        }
    }

    private String roundTemp(String str){
        float x = Float.parseFloat(str);
        Integer y = Math.round(x);
        return y.toString();
    }

    private String roundTwo(String str){
        Float x = Float.parseFloat(str);
        int y = Math.round(x*100);
        x = (float) (y/100.0);
        return x.toString();
    }

    private String getDate(String str, String tz){
        long millis = Long.parseLong(str) * 1000;
        Date date = new Date(millis);
        SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy", Locale.ENGLISH);
        sdf.setTimeZone(TimeZone.getTimeZone(tz));
        String formattedDate = sdf.format(date);
        return formattedDate;
    }

    public boolean onCreateOptionsMenu(Menu menu) {
        MenuInflater inflater = getMenuInflater();
        inflater.inflate(R.menu.menu, menu);
        MenuItem searchViewItem = menu.findItem(R.id.action_search);
        final SearchView searchView = (SearchView) MenuItemCompat.getActionView(searchViewItem);

        final SearchView.SearchAutoComplete searchAutoComplete = (SearchView.SearchAutoComplete) searchView.findViewById(android.support.v7.appcompat.R.id.search_src_text);
        searchAutoComplete.setAdapter(adapter);

        MenuItemCompat.setOnActionExpandListener(searchViewItem, new MenuItemCompat.OnActionExpandListener() {
            @Override
            public boolean onMenuItemActionExpand(MenuItem item) {
                //Toast.makeText(MainActivity.this, "onMenuItemActionExpand called", Toast.LENGTH_LONG).show();
                return true;
            }

            @Override
            public boolean onMenuItemActionCollapse(MenuItem item) {
               // Toast.makeText(MainActivity.this, "onMenutItemActionCollapse called", Toast.LENGTH_LONG).show();
                displayWeather(IP_url, "dummy");
                return true;
            }
        });

      searchView.setOnQueryTextListener(new SearchView.OnQueryTextListener() {
            @Override
            public boolean onQueryTextSubmit(String query) {
                searchView.clearFocus();
               // Toast.makeText(MainActivity.this, query,Toast.LENGTH_LONG).show();
                String qurl = Loc_url + query;
                displayWeather(qurl, query);
                if(list.contains(query)){
                    adapter.getFilter().filter(query);
                }else{
                    Toast.makeText(MainActivity.this, "No Match found",Toast.LENGTH_LONG).show();
                }
                return false;

            }

            @Override
            public boolean onQueryTextChange(String newText) {
                if(newText.equals("")){
                   // list.clear();
                    return false;
                }
//                String url = Auto_url + newText;
//                autoc(url);
//                jsonObjectRequest3 = new JsonObjectRequest
//                        (Request.Method.GET, url, null, new Response.Listener<JSONObject>() {
//
//                            @Override
//                            public void onResponse(JSONObject response) {
//                                try{
//                                    ja = (JSONArray) response.get("predictions");
//                                    for(int i =0; i < ja.length(); i++){
//                                        jo = ja.getJSONObject(i);
//                                        Toast.makeText(getApplicationContext(), jo.getString("description"),Toast.LENGTH_LONG).show();
//                                        list.add(jo.getString("description"));
//                                    }
//
//
//                                } catch (JSONException ex){}
//
//                            }
//                        }, new Response.ErrorListener() {
//
//                            @Override
//                            public void onErrorResponse(VolleyError error) {
//                                Toast.makeText(getApplicationContext(), "JSON not found",Toast.LENGTH_LONG).show();
//                                Log.e("VOLLEY", error.getMessage());
//                            }
//                        });
//                requestQueue.add(jsonObjectRequest3);

                adapter.getFilter().filter(newText);
                return false;
            }
        });

        searchAutoComplete.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int
                    count, int after) {
            }
            @Override
            public void onTextChanged(CharSequence s, int start, int before,
                                      int count) {
                handler.removeMessages(TRIGGER_AUTO_COMPLETE);
                handler.sendEmptyMessageDelayed(TRIGGER_AUTO_COMPLETE,
                        AUTO_COMPLETE_DELAY);

            }
            @Override
            public void afterTextChanged(Editable s) {
            }
        });

        handler = new Handler(new Handler.Callback() {
            @Override
            public boolean handleMessage(Message msg) {
                if (msg.what == TRIGGER_AUTO_COMPLETE) {
                    if (!TextUtils.isEmpty(searchAutoComplete.getText())) {
                        autoc(Auto_url + searchAutoComplete.getText().toString());
                    }
                }

               // searchAutoComplete.setAdapter(adapter);

                return false;
            }
        });


        searchAutoComplete.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int itemIndex, long id) {
                String queryString=(String)adapterView.getItemAtPosition(itemIndex);
                searchAutoComplete.setText("" + queryString);
            }
        });

        return super.onCreateOptionsMenu(menu);
    }

    private void autoc(String url){

        jsonObjectRequest3 = new JsonObjectRequest
                (Request.Method.GET, url, null, new Response.Listener<JSONObject>() {

                    @Override
                    public void onResponse(JSONObject response) {
                        try{
                            //list.clear();
                            adapter.clear();
                            ja = (JSONArray) response.get("predictions");
                            for(int i =0; i < ja.length(); i++){
                                jo = ja.getJSONObject(i);
                               // Toast.makeText(getApplicationContext(), jo.getString("description"),Toast.LENGTH_LONG).show();
                                list.add(jo.getString("description"));
                            }
                           // adapter = new ArrayAdapter<String>(context, android.R.layout.simple_dropdown_item_1line, list);

                            for (String str: list){
                                adapter.insert(str, 0);

                            }


                            adapter.notifyDataSetChanged();
                        } catch (JSONException ex){}

                    }
                }, new Response.ErrorListener() {

                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Toast.makeText(getApplicationContext(), "JSON not found",Toast.LENGTH_LONG).show();
                        Log.e("VOLLEY", error.getMessage());
                    }
                });
        requestQueue.add(jsonObjectRequest3);


    }

    private void displayWeather(final String durl, final String place){
       spinner.setVisibility(View.VISIBLE);
        card1.setVisibility(View.GONE);
        card2.setVisibility(View.GONE);
        card3.setVisibility(View.GONE);
        scht.setVisibility(View.GONE);
        fw.setVisibility(View.VISIBLE);


        jsonObjectRequest = new JsonObjectRequest
                (Request.Method.GET, durl, null, new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {
                        String nurl = "";
                        try{

                            spinner.setVisibility(View.VISIBLE);
                            card1.setVisibility(View.GONE);
                            card2.setVisibility(View.GONE);
                            card3.setVisibility(View.GONE);
                            scht.setVisibility(View.GONE);
                            fw.setVisibility(View.VISIBLE);
                            TextView card1_loc = findViewById(R.id.loc_card_view1);
                            TextView srch = findViewById(R.id.search_indicator);
                            if(durl.equals(IP_url)) {
                                IP_lat = response.get("lat").toString();
                                IP_lon = response.get("lon").toString();
                                IP_city = response.get("city").toString();
                                IP_region = response.get("region").toString();
                                IP_regionName = response.get("regionName").toString();
                                nurl = LL_url + IP_lat + "&lon=" + IP_lon;
                                card1_loc.setText(IP_city + ", " + IP_region + ", " + "USA");
                                srch.setText("");
                                PlaceText = IP_city + ", " + IP_region + ", " + "USA";

                            } else {
                                ja = (JSONArray) response.get("results");
                                jo = (JSONObject) ja.get(0);
                                jo = (JSONObject) jo.get("geometry");
                                jo = (JSONObject) jo.get("location");
                                nurl = LL_url + jo.getString("lat") + "&lon=" + jo.getString("lng");
                                card1_loc.setText(place);
                                srch.setText("Search Result");
                                PlaceText = new String(place);

                            }
                        } catch (JSONException ex){
                        }
                        // RequestQueue requestQueue2 = Volley.newRequestQueue(context);

                        jsonObjectRequest2 = new JsonObjectRequest
                                (Request.Method.GET, nurl, null, new Response.Listener<JSONObject>() {

                                    @Override
                                    public void onResponse(JSONObject response) {
                                        try{
                                         //   Toast.makeText(getApplicationContext(), "descriptionC",Toast.LENGTH_LONG).show();

                                            String tz = response.getString("timezone");
                                            jo = (JSONObject) response.get("currently");
                                            LL_icon = jo.get("icon").toString();
                                            C11 = LL_icon;
                                            C11_icon = getIcon(C11);
                                            TextView card1_temp = findViewById(R.id.temp_card_view1);
                                            card1_temp.setText(roundTemp(jo.get("temperature").toString()) + (char) 0x00B0 + "F");
                                            C10 = card1_temp.getText().toString();
                                            TextView card1_sum = findViewById(R.id.sum_card_view1);
                                            card1_sum.setText(jo.get("summary").toString());
                                            ImageView card1_image = findViewById(R.id.image_card_view1);
                                            card1_image.setImageResource(getIcon(LL_icon));
                                            Float x = Float.parseFloat(jo.get("humidity").toString());
                                            Integer y = Math.round(x*100);
                                            TextView card2_hum = findViewById(R.id.card_view2_hum_val);
                                            card2_hum.setText(y.toString() + "%");
                                            C12 = card2_hum.getText().toString();
                                            TextView card2_ws = findViewById(R.id.card_view2_win_val);
                                            card2_ws.setText(roundTwo(jo.get("windSpeed").toString()) + " mph");
                                            C00 = card2_ws.getText().toString();
                                            TextView card2_v = findViewById(R.id.card_view2_vis_val);
                                            card2_v.setText(roundTwo(jo.get("visibility").toString()) + " km");
                                            C20 = card2_v.getText().toString();
                                            TextView card2_p = findViewById(R.id.card_view2_pre_val);
                                            card2_p.setText(roundTwo(jo.get("pressure").toString()) + "0 mb");
                                            C01 = card2_p.getText().toString();
                                            C02 = roundTwo(jo.getString("precipIntensity")) + " mmph";
                                            x = Float.parseFloat(jo.getString("cloudCover"));
                                            y = Math.round(x*100);
                                            C21 = y.toString() + "%";
                                            C22 = roundTwo(jo.getString("ozone")) + "0 DU";
                                            jo = (JSONObject) response.get("daily");
                                            CWK_icon = getIcon(jo.getString("icon"));
                                            CWK_sum = jo.getString("summary");
                                            ja = (JSONArray) jo.get("data");
                                            final int[] dates_col = {R.id.t00, R.id.t10, R.id.t20, R.id.t30, R.id.t40, R.id.t50, R.id.t60, R.id.t70};
                                            final int[] img_col = {R.id.t01, R.id.t11, R.id.t21, R.id.t31, R.id.t41, R.id.t51, R.id.t61, R.id.t71};
                                            final int[] min_col = {R.id.t02, R.id.t12, R.id.t22, R.id.t32, R.id.t42, R.id.t52, R.id.t62, R.id.t72};
                                            final int[] max_col = {R.id.t03, R.id.t13, R.id.t23, R.id.t33, R.id.t43, R.id.t53, R.id.t63, R.id.t73};
                                            for(int i = 0; i < 8; i++){
                                                jo =  ja.getJSONObject(i);
                                                ImageView tableImage = findViewById(img_col[i]);
                                                tableImage.setImageResource(getIcon(jo.get("icon").toString()));
                                                TextView maxTemp = findViewById(max_col[i]);
                                                maxTemp.setText(roundTemp(jo.get("temperatureHigh").toString()));
                                                TextView minTemp = findViewById(min_col[i]);
                                                minTemp.setText(roundTemp(jo.get("temperatureLow").toString()));
                                                TextView date = findViewById(dates_col[i]);
                                                date.setText(getDate(jo.getString("time"), tz));
                                                mins[i] = Integer.parseInt(minTemp.getText().toString());
                                                maxs[i] = Integer.parseInt(maxTemp.getText().toString());

                                            }

                                           // Toast.makeText(getApplicationContext(), "description",Toast.LENGTH_LONG).show();

                                            spinner.setVisibility(View.GONE);
                                            card1.setVisibility(View.VISIBLE);
                                            card2.setVisibility(View.VISIBLE);
                                            card3.setVisibility(View.VISIBLE);
                                            scht.setVisibility(View.VISIBLE);
                                            fw.setVisibility(View.GONE);


                                        } catch (JSONException ex){
                                            //Toast.makeText(getApplicationContext(), "description1",Toast.LENGTH_LONG).show();
                                        }


                                    }
                                }, new Response.ErrorListener() {

                                    @Override
                                    public void onErrorResponse(VolleyError error) {
                                        Toast.makeText(getApplicationContext(), "JSON not found",Toast.LENGTH_LONG).show();
                                        Log.e("VOLLEY", error.getMessage());
                                    }
                                });


                        requestQueue.add(jsonObjectRequest2);

                    }


                }, new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Toast.makeText(getApplicationContext(), "JSON not found",Toast.LENGTH_LONG).show();
                        Log.e("VOLLEY", error.getMessage());
                    }
                });
        requestQueue.add(jsonObjectRequest);

       /* spinner.setVisibility(View.GONE);
        card1.setVisibility(View.VISIBLE);
        card2.setVisibility(View.VISIBLE);
        card3.setVisibility(View.VISIBLE);
        scht.setVisibility(View.VISIBLE);
        fw.setVisibility(View.GONE);*/

    }

    public void onClick1(View v) {
        Intent intent = new Intent(MainActivity.this,Details.class);
        intent.putExtra("PLACE", PlaceText);
        intent.putExtra("C00", C00);
        intent.putExtra("C01", C01);
        intent.putExtra("C02", C02);
        intent.putExtra("C10", C10);
        intent.putExtra("C11", C11);
        intent.putExtra("C12", C12);
        intent.putExtra("C20", C20);
        intent.putExtra("C21", C21);
        intent.putExtra("C22", C22);
        intent.putExtra("C11_icon", C11_icon);
        intent.putExtra("CWK_icon", CWK_icon);
        intent.putExtra("CWK_sum", CWK_sum);
        intent.putExtra("mins", mins);
        intent.putExtra("maxs", maxs);
        spinner.setVisibility(View.VISIBLE);
        fw.setVisibility(View.VISIBLE);
        scht.setVisibility(View.GONE);
        card1.setVisibility(View.GONE);
        card2.setVisibility(View.GONE);
        card3.setVisibility(View.GONE);
        startActivity(intent);
//        spinner.setVisibility(View.GONE);
//        fw.setVisibility(View.GONE);
//        scht.setVisibility(View.VISIBLE);
//        card1.setVisibility(View.VISIBLE);
//        card2.setVisibility(View.VISIBLE);
//        card3.setVisibility(View.VISIBLE);
    }

    @Override
    public void onResume(){
        super.onResume();
        spinner.setVisibility(View.GONE);
        fw.setVisibility(View.GONE);
        scht.setVisibility(View.VISIBLE);
        card1.setVisibility(View.VISIBLE);
        card2.setVisibility(View.VISIBLE);
        card3.setVisibility(View.VISIBLE);
    }

    public void tweetClick(){
        String url = "http://www.google.com";
        Uri uri = Uri.parse(url);
        Intent intent = new Intent(Intent.ACTION_VIEW, uri);
        if (intent.resolveActivity(getPackageManager()) != null) {
            startActivity(intent);
        }

    }

}
