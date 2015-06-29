package cn.core.util;

import org.apache.log4j.Logger;

public class LoggerUtil {
    private Class<?> clz = null;
    public LoggerUtil(Class<?> clz_){
        clz = clz_;
    }
    
    private Logger logger = Logger.getLogger(clz);
    
    public void loggerInfo(String msg){
        logger.info(msg);
    }
}
