package allyouneed.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

public class ForceEncodingFilter implements Filter {
	
	private static final String CHARSET = "UTF-8";


	public void init(FilterConfig filterConfig) throws ServletException {
	}

	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
		request.setCharacterEncoding(ForceEncodingFilter.CHARSET);
		chain.doFilter(request, response);
	}

	public void destroy() {
	}

}
