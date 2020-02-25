package com.example.weatherapp;

import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentStatePagerAdapter;
import android.os.Bundle;


public class TabsAdapter extends FragmentStatePagerAdapter {
    int mNumOfTabs;
    final String Photos_url = "http://csci571pms3-nodejs.us-west-1.elasticbeanstalk.com/place?place=";
    String place;
    String[] firstTab;
    int wkic;
    String wksm;
    int [] mins, maxs;
    public TabsAdapter(FragmentManager fm, int NoofTabs, String[] argA, int argB, String argC, int[] mins, int [] maxs, String plc){
        super(fm);
        this.mNumOfTabs = NoofTabs;
        this.firstTab = argA;
        this.wkic = argB;
        this.wksm = argC;
        this.mins = mins;
        this.maxs = maxs;
        this.place = plc;
    }
    @Override
    public int getCount() {
        return mNumOfTabs;
    }
    @Override
    public Fragment getItem(int position){
        Bundle bundle = new Bundle();
        switch (position){
            case 0:
                TodayFragment today = new TodayFragment();
                bundle.putStringArray("array", firstTab);
                today.setArguments(bundle);
                return today;
            case 1:
                WeeklyFragment weekly = new WeeklyFragment();
                bundle.putInt("wkic", wkic);
                bundle.putString("wksm", wksm);
                bundle.putIntArray("mins", mins);
                bundle.putIntArray("maxs", maxs);
                weekly.setArguments(bundle);
                return weekly;
            case 2:
                PhotosFragment photos = new PhotosFragment();
                bundle.putString("url", Photos_url + place);
                photos.setArguments(bundle);
                return photos;
            default:
                return null;
        }
    }
}