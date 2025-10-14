package com.clgapp.backend.Model;

import com.fasterxml.jackson.annotation.JsonInclude;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@JsonInclude(JsonInclude.Include.NON_EMPTY) // omit empty maps
public class Search {

    private Map<String, Search> children = new HashMap<>();
    private boolean wordEnd;

    public Map<String, Search> getChildren() {
        return children;
    }

    public void setChildren(Map<String, Search> children) {
        this.children = children;
    }

    public boolean isWordEnd() {
        return wordEnd;
    }

    public void setWordEnd(boolean wordEnd) {
        this.wordEnd = wordEnd;
    }

    public Search getTrie(List<String> wordList) {
        Search root = new Search();
        for (String word : wordList) {
            Search temp = root;
            for (char c : word.toCharArray()) {
                String key = String.valueOf(c);
                Search next = temp.children.getOrDefault(key, new Search());
                temp.children.put(key, next);
                temp = next;
            }
            temp.wordEnd = true;
        }
        return root;
    }
}

