export const getDrivers= async()=>{
  const url ='api/get-drivers'
  try{
      const response = await fetch(url)
      const result= await response.json()
      return result
  }
  catch(error:any){
      return error.message
  }
};
export const getSummaryDocuments = async (slug:number) => {
  const url = `api/sum/${slug}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error('Response not OK:', response.status, response.statusText);
      return [];
    }
    const result = await response.json();
    console.log('Data received:', result); 
    console.log(result.personal_documents);

    return result;
    
  } catch (error: any) {
    console.error('Fetch error:', error.message);
    return [];
  }
};

export const getPersonalDocuments = async (slug:number) => {
  const url = `api/personal/${slug}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error('Response not OK:', response.status, response.statusText);
      return [];
    }
    const result = await response.json();
    console.log('Data received:', result); 
    console.log(result.personal_documents);

    return result.personal_documents;
    
  } catch (error: any) {
    console.error('Fetch error:', error.message);
    return [];
  }
};

export const getTruckDocuments = async (slug:number) => {
  const url = `api/truck/${slug}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error('Response not OK:', response.status, response.statusText);
      return [];
    }
    const result = await response.json();
    console.log('Data received:', result); 
    console.log(result.truck_documents);
   

    return result.truck_documents;
    
  } catch (error: any) {
    console.error('Fetch error:', error.message);
    return [];
  }
};

export const getCargoDocuments = async (slug: number) => {
  const url = `api/cargo/${slug}`; // Use the correct endpoint for cargo documents
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error('Response not OK:', response.status, response.statusText);
      return [];
    }
    const result = await response.json();
    console.log('Data received:', result);
    console.log(result.cargo_documents);

    return result.cargo_documents;
  } catch (error: any) {
    console.error('Fetch error:', error.message);
    return [];
  }
};
export const verification = async (slug: number) => {
  const url = `api/verify/${slug}`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({status:"Verified"}),
    });
    console.log(response);
    
    const result = await response.json();
    console.log(result);
    
    return result;
  } catch (error: any) {
    
  }
};
export const rejected = async (slug: number) => {
  const url = `api/rej/${slug}`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({status:"Rejected"}),
    });
    console.log(response);
    
    const result = await response.json();
    console.log(result);
    
    return result;
  } catch (error: any) {
    
  }
};
export const cleared = async (slug: number) => {
  const url = `/api/clear/${slug}`; 
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status:"Cleared"}),
    });

    if (!response.ok) {
      console.error('Response not OK:', response.status, response.statusText);
      return { success: false, message: `Error: ${response.status} - ${response.statusText}` };
    }

    const result = await response.json();
    console.log(result);

    return { success: true, data: result };
  } catch (error: any) {
    console.error('Fetch error:', error.message);
    return { success: false, message: `Error: ${error.message}` };
  }
};



export const rejectedVerify = async (slug: number) => {
  const url = `/api/verej/${slug}`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status:"Rejected"}),
    });

    if (!response.ok) {
      console.error('Response not OK:', response.status, response.statusText);
      return { success: false, message: `Error: ${response.status} - ${response.statusText}` };
    }

    const result = await response.json();
    console.log(result);

    return { success: true, data: result };
  } catch (error: any) {
    console.error('Fetch error:', error.message);
    return { success: false, message: `Error: ${error.message}` };
  }
};

export const docVerification = async (id) => {
  const url = `api/document/${id}`;

  try {
    const formData = new FormData();
    formData.append('is_verified', 'True');

    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    console.log("responseeeeeeeeeeeeeeeee", response);

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    const result = await response.json();
    console.log("resulttttttttttt", result);

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};



interface FormData {
  username: string;
  email_address: string;
  first_name:string;
  last_name:string;
  phone_number:string;
  custom_id:string;
  password: string;
}
export const registerUser = async (formData: FormData) => {
  const url = '/api/post-users';
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const result = await response.json();
    return result;
  } catch (error: any) {
    
  }
};

export const loguser = async (username: string, password: string) => {
  try {
    const response = await fetch(`/api/login-users`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      method: "POST",
      body: JSON.stringify({
        "username": username,
        "password": password
      })
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error logging in an loguser:", error);
    return [];
  }
};
