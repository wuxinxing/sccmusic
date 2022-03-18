package jxnu.edu.cn.test;

import org.junit.Test;

import java.lang.reflect.Array;
import java.util.Arrays;

public class test1 {
    public  int[] twoSum(int[] nums, int target) {
        int len=nums.length;
        for(int i=0;i<len-1;i++){
            for(int j=i+1;j<len;j++){
                if(nums[i]+nums[j]==target){
                    return new int[]{i,j};
                }
            }
        }
        return new int[0];
    }

    @Test
    public void test() {
        int[] index=twoSum(new int[]{2,7,11,15},26);
        int[] index2=new int[]{1,3};
        System.out.println(Arrays.toString(index));
    }
}
