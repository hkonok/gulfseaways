<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class gulf extends CI_Controller {
	
        public function index()
	{
            $this->load->view('regions/header');
            $this->load->view('home');
            $this->load->view('regions/footer');
	}
    
	public function home()
	{
            $this->load->view('regions/header');
            $this->load->view('home');
            $this->load->view('regions/footer');
	}

        public function contact(){
            $this->load->view('regions/header_all');
            $this->load->view('contact');
            $this->load->view('regions/footer_all');
        }

        public function our_projects(){
            $this->load->view('regions/header_all');
            $this->load->view('our_projects');
            $this->load->view('regions/footer_all');
        }

        public function history(){
            $this->load->view('regions/header_all');
            $this->load->view('history');
            $this->load->view('regions/footer_all');
        }

        public function ngn_telecom(){
            $this->load->view('regions/header_all');
            $this->load->view('ngn');
            $this->load->view('regions/footer_all');
        }

        public function odd(){
            $this->load->view('regions/header_all');
            $this->load->view('odd');
            $this->load->view('regions/footer_all');
        }

        public function project_logistics(){
            $this->load->view('regions/header_all');
            $this->load->view('project_logistics');
            $this->load->view('regions/footer_all');
        }

        public function road_transportation(){
            $this->load->view('regions/header_all');
            $this->load->view('road_transportation');
            $this->load->view('regions/footer_all');
        }

        public function services_barge(){
            $this->load->view('regions/header_all');
            $this->load->view('services_barge');
            $this->load->view('regions/footer_all');
        }

        public function services_barge_container(){
             $this->load->view('regions/header_all');
            $this->load->view('services_barge_container');
            $this->load->view('regions/footer_all');
        }

        public function services_barge_owning(){
            $this->load->view('regions/header_all');
            $this->load->view('services_barge_owning');
            $this->load->view('regions/footer_all');
        }

        public function services_general(){
            $this->load->view('regions/header_all');
            $this->load->view('services_general');
            $this->load->view('regions/footer_all');
        }

    public function contact_us(){
            $this->load->helper('captcha');
            $vals = array(
                        'img_path'	 => './captcha/',
                        'img_url'	 => base_url().'captcha/',
                        'img_width'	 => '150',
                        'img_height' => 30,
                        'expiration' => 7200
                    );

            $cap = create_captcha($vals);
            $this->load->view('regions/header_all');
            $this->load->view('contact_us', $cap);
            $this->load->view('regions/footer_all');
        }

        public function test(){
            $this->load->helper('captcha');
            $vals = array(
                        'img_path'	 => './captcha/',
                        'img_url'	 => base_url().'captcha/',
                        'img_width'	 => '150',
                        'img_height' => 30,
                        'expiration' => 7200
                    );

            $cap = create_captcha($vals);
            echo $cap['image'];
        }


}