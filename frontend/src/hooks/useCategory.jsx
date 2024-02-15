import React,{useState, useEffect} from "react";
import axios from "axios"

const useCategory = () => {
    const [categories, setCategories] = useState([]);

    // get all categoris
    const getAllCategories = async () => {
        try {
            const { data } = await axios.get(
                "http://localhost:8080/api/v1/category/get-all-category",
                {
                    withCredentials: true,
                }
            );
            setCategories(data.categories);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getAllCategories();
    }, []);
    return categories;
};

export default useCategory;
