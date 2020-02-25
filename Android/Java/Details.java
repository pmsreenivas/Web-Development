package com.example.weatherapp;

import android.content.Context;
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
//import android.app.ActionBar;
import android.support.v7.app.ActionBar;
import android.support.design.widget.TabLayout;
import android.support.v4.view.ViewPager;
import android.net.Uri;


public class Details extends AppCompatActivity {
    MenuItem searchViewItem;
    MenuItem twitterViewItem;
    String twPlace;
    String twTemp;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_details);
        ActionBar actionBar = getSupportActionBar();
        if (actionBar != null) {
            actionBar.setDisplayHomeAsUpEnabled(true);
        }

        Intent intent = getIntent();
        String firstTab[] = new String[9];
        String place = intent.getStringExtra("PLACE");
        actionBar.setTitle(place);

        twPlace = place;


        firstTab[0] = intent.getStringExtra("C00");
        firstTab[1] = intent.getStringExtra("C01");
        firstTab[2] = intent.getStringExtra("C02");
        firstTab[3] = intent.getStringExtra("C10");
        firstTab[4] = intent.getStringExtra("C11");
        firstTab[5] = intent.getStringExtra("C12");
        firstTab[6] = intent.getStringExtra("C20");
        firstTab[7] = intent.getStringExtra("C21");
        firstTab[8] = intent.getStringExtra("C22");

        twTemp = firstTab[3];

        int tab2ic = intent.getIntExtra("CWK_icon", 0);
        String tab2sum = intent.getStringExtra("CWK_sum");

        int[] mins = intent.getIntArrayExtra("mins");
        int[] maxs = intent.getIntArrayExtra("maxs");

        TabLayout tabLayout = (TabLayout) findViewById(R.id.tab_layout);
        tabLayout.addTab(tabLayout.newTab().setText("Today"));
        tabLayout.addTab(tabLayout.newTab().setText("Weekly"));
        tabLayout.addTab(tabLayout.newTab().setText("Photos"));
        tabLayout.getTabAt(0).setIcon(R.mipmap.today_pic);
        tabLayout.getTabAt(1).setIcon(R.mipmap.weekly_pic);
        tabLayout.getTabAt(2).setIcon(R.mipmap.photos_pic);

        tabLayout.setTabGravity(TabLayout.GRAVITY_FILL);
        final ViewPager viewPager =(ViewPager)findViewById(R.id.view_pager);
        TabsAdapter tabsAdapter = new TabsAdapter(getSupportFragmentManager(), tabLayout.getTabCount(), firstTab, tab2ic, tab2sum, mins, maxs, place);
        viewPager.setAdapter(tabsAdapter);
        viewPager.addOnPageChangeListener(new TabLayout.TabLayoutOnPageChangeListener(tabLayout));
        tabLayout.setOnTabSelectedListener(new TabLayout.OnTabSelectedListener() {
            @Override
            public void onTabSelected(TabLayout.Tab tab) {
                viewPager.setCurrentItem(tab.getPosition());
            }
            @Override
            public void onTabUnselected(TabLayout.Tab tab) {

            }
            @Override
            public void onTabReselected(TabLayout.Tab tab) {

            }
        });

        ProgressBar pb = findViewById(R.id.progressBar2);
        TextView fch = findViewById(R.id.fetch2);
        TabLayout tl = findViewById(R.id.tab_layout);
        ViewPager vp = findViewById(R.id.view_pager);

        pb.setVisibility(View.GONE);
        fch.setVisibility(View.GONE);
        tl.setVisibility(View.VISIBLE);
        vp.setVisibility(View.VISIBLE);

    }

    public boolean onOptionsItemSelected(MenuItem item){
        switch (item.getItemId()) {
            case android.R.id.home:
                searchViewItem.setVisible(true);
                twitterViewItem.setVisible(false);
                finish();
                return true;
            case R.id.action_tweet:
                tweetClick();
                return true;
        }
        return super.onOptionsItemSelected(item);
    }



    public boolean onCreateOptionsMenu(Menu menu) {
        MenuInflater inflater = getMenuInflater();
        inflater.inflate(R.menu.menu, menu);
        searchViewItem = menu.findItem(R.id.action_search);
        twitterViewItem = menu.findItem(R.id.action_tweet);
        searchViewItem.setVisible(false);
        twitterViewItem.setVisible(true);
        return true;
    }

    public void tweetClick(){
        String url = "https://twitter.com/intent/tweet?text=Check Out " + twPlace + "’s Weather! It is " + twTemp +"!&hashtags=CSCI571WeatherSearch";
        Uri uri = Uri.parse(url);
        Intent intent = new Intent(Intent.ACTION_VIEW, uri);
        if (intent.resolveActivity(getPackageManager()) != null) {
            startActivity(intent);
        }

    }

}
