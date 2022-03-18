package jxnu.edu.cn.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@ComponentScan("jxnu.edu.cn")
@Import(DataSourceconfiguration.class)
public class Springconfiguration {

}
