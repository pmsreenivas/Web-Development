package com.example.weatherapp;

import android.content.Context;
import android.support.v4.app.Fragment; import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;
import org.json.JSONObject;
import org.json.JSONException;

import com.squareup.picasso.Picasso;



public class PhotosFragment extends Fragment {
    JSONObject jo;
    JSONArray ja;
    JsonObjectRequest jsonObjectRequest;
    String [] picUrls = new String[8];
    RequestQueue requestQueue;
    Context context;


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup viewGroup, Bundle savedInstanceState){
        final View view = inflater.inflate(R.layout.photos_layout, viewGroup, false);
        String nurl = getArguments().getString("url");
        context = getActivity().getApplicationContext();

        requestQueue = Volley.newRequestQueue(context);


        jsonObjectRequest = new JsonObjectRequest
                (Request.Method.GET, nurl, null, new Response.Listener<JSONObject>() {

                    @Override
                    public void onResponse(JSONObject response) {
                        try{
                            ja = (JSONArray) response.get("items");
                            ImageView imageView;
                            int [] pics = {R.id.im00, R.id.im10, R.id.im20, R.id.im30, R.id.im40, R.id.im50, R.id.im60, R.id.im70};
                            for(int i = 0; i < 8; i++){
                                jo = ja.getJSONObject(i);
                                picUrls[i] = jo.getString("link");
                                imageView = view.findViewById(pics[i]);
                                Picasso.with(context).load(picUrls[i]).into(imageView);
                            }

                        } catch (JSONException ex){}

                    }
                }, new Response.ErrorListener() {

                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Log.e("VOLLEY", error.getMessage());
                    }
                });
        requestQueue.add(jsonObjectRequest);
        return view;

    }
}